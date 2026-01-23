import { listeToRoomById, updateRoom } from "../server/server";
import type { Room } from "../types/room";
import type { Side, ShipPos } from "../types/room";

type PosKey = string;
type ShipStatus = "canMove" | "blocked";
type FirebasePatch = Record<string, unknown>;
type RoomWithLastDice = Room & { lastDiceResult?: number };

const SHIP_IDS: Record<Side, string[]> = {
  left: Array.from({ length: 8 }, (_, i) => `p1-cell-${i + 1}`),
  right: Array.from({ length: 8 }, (_, i) => `p2-cell-${i + 1}`),
};

type Snapshot = {
  side: Side;
  turnSide: Side | undefined;
  isPlayersTurn: boolean;
  stepsStrike: number[];
  availableSteps: number[];
  shipsMine: Record<string, ShipPos>;
  shipsOpp: Record<string, ShipPos>;
  canMove: boolean;
};

const safeUpdate = (id: Room["id"], patch: FirebasePatch): Promise<void> =>
  updateRoom(id, patch).then(() => undefined).catch(() => undefined);

function calcAvailableSteps(strike: number[]): number[] {
  const nums = strike.filter((n) => Number.isFinite(n) && n > 0);
  const set = new Set<number>();
  nums.forEach((n) => set.add(n));
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      set.add(nums[i] + nums[j]);
    }
  }
  if (nums.length > 1) {
    set.add(nums.reduce((a, b) => a + b, 0));
  }
  return Array.from(set).sort((a, b) => a - b);
}

function buildSideShips(room: Room, side: Side): Record<string, ShipPos> {
  const raw = (room.ships?.[side] || {}) as Record<string, ShipPos>;
  const map: Record<string, ShipPos> = {};
  for (const id of SHIP_IDS[side]) {
    map[id] = raw[id] ?? "hand";
  }
  return map;
}

function isMother(id: string): boolean {
  return id.endsWith("-cell-8");
}

function parsePos(pos: ShipPos): { base: number | null; sub: string | null } {
  const s = String(pos);
  if (s === "hand") return { base: null, sub: null };
  if (s === "final-2") return { base: 25, sub: null };
  if (s === "final-1") return { base: 26, sub: null };
  if (s === "final-0" || s === "final") return { base: 27, sub: null };
  const m = s.match(/^field-(\d+)(?:-(\d))?$/);
  if (m) return { base: Number(m[1]), sub: m[2] ?? null };
  return { base: null, sub: null };
}

function toPosKey(base: number): PosKey {
  if (base >= 27) return "final-0";
  if (base === 26) return "final-1";
  if (base === 25) return "final-2";
  return `field-${base}`;
}

function chooseLandingFromBase(base: number): PosKey | null {
  if (base >= 27) return "final-0";
  if (base === 24) return null;
  return toPosKey(base);
}

function makePosIndexMap(ships: Record<string, ShipPos>) {
  const byPos = new Map<PosKey, string[]>();
  for (const [id, pos] of Object.entries(ships)) {
    const s = String(pos);
    if (s === "hand") continue;
    const arr = byPos.get(s) || [];
    arr.push(id);
    byPos.set(s, arr);
  }
  return byPos;
}

function isOccupiedByOpponent(target: PosKey, oppByPos: Map<PosKey, string[]>): boolean {
  if (target === "final-0") return false;
  return (oppByPos.get(target)?.length || 0) > 0;
}

function isAllowedOwnStack(target: PosKey, moverId: string, mineByPos: Map<PosKey, string[]>) {
  if (target === "final-0") return true;
  const ids = mineByPos.get(target) || [];
  if (ids.length === 0) return true;
  if (ids.length >= 2) return false;
  const otherId = ids[0];
  return (isMother(moverId) && !isMother(otherId)) || (!isMother(moverId) && isMother(otherId));
}

function computeTarget(from: ShipPos, step: number): PosKey | null {
  if (!Number.isFinite(step) || step <= 0) return null;
  const { base, sub } = parsePos(from);
  if (base === null) {
    const proj = step;
    if (proj >= 27) return "final-0";
    if (proj === 24) return null;
    return chooseLandingFromBase(proj);
  }
  if (base === 24) return null;
  if (base === 6 || base === 12 || base === 18) {
    if (sub === "1") {
      if (step <= 1) return null;
      const proj = base + (step - 1);
      if (proj >= 27) return "final-0";
      if (proj === 24) return null;
      return chooseLandingFromBase(proj);
    }
    if (sub === "2") {
      if (step <= 2) return null;
      const proj = base + (step - 3);
      if (proj >= 27) return "final-0";
      if (proj === 24) return null;
      return chooseLandingFromBase(proj);
    }
  }
  if (base === 23 && step >= 4) return "final-0";
  if (base === 25 && step >= 2) return "final-0";
  if (base === 26 && step >= 1) return "final-0";
  const proj = base + step;
  if (proj === 24) return null;
  if (proj >= 27) return "final-0";
  return chooseLandingFromBase(proj);
}

function isGatewayKey(k: PosKey) {
  return /^field-(6|12|18)$/.test(k);
}

function resolveGateway(
  baseKey: PosKey,
  moverId: string,
  mineByPos: Map<PosKey, string[]>,
  oppByPos: Map<PosKey, string[]>,
): PosKey | null {
  const options: PosKey[] = [`${baseKey}-1`, `${baseKey}-2`];
  for (const key of options) {
    const hasOpp = (oppByPos.get(key)?.length || 0) > 0;
    if (hasOpp) continue;
    if (!isAllowedOwnStack(key, moverId, mineByPos)) continue;
    return key;
  }
  return null;
}

function canShipMove(
  id: string,
  from: ShipPos,
  steps: number[],
  mine: Record<string, ShipPos>,
  opp: Record<string, ShipPos>,
  motherActive: boolean,
): boolean {
  if (String(from) === "final-0") return false;
  if (from === "hand" && !motherActive && isMother(id)) return false;
  const mineByPos = makePosIndexMap(mine);
  const oppByPos = makePosIndexMap(opp);
  for (const s of steps) {
    let target = computeTarget(from, s);
    if (!target) continue;
    if (target === "final-0") return true;
    if (isGatewayKey(target)) {
      const resolved = resolveGateway(target, id, mineByPos, oppByPos);
      if (!resolved) continue;
      target = resolved;
    }
    if (isOccupiedByOpponent(target, oppByPos)) continue;
    if (!isAllowedOwnStack(target, id, mineByPos)) continue;
    return true;
  }
  return false;
}

function canAnyMove(mine: Record<string, ShipPos>, opp: Record<string, ShipPos>, steps: number[]) {
  const hasSimpleOnHand = Object.entries(mine).some(
    ([id, pos]) => !isMother(id) && String(pos) === "hand",
  );
  const motherActive = !hasSimpleOnHand;
  return Object.entries(mine).some(([id, pos]) =>
    canShipMove(id, pos, steps, mine, opp, motherActive),
  );
}

function buildSnapshot(room: Room, side: Side): Snapshot {
  const opp: Side = side === "left" ? "right" : "left";
  const shipsMine = buildSideShips(room, side);
  const shipsOpp = buildSideShips(room, opp);
  const turnSide = room.isTurn as Side | undefined;
  const idx = side === "left" ? 0 : 1;
  const stepsStrike = (room.players?.[idx]?.diceStreak ?? []) as number[];
  const availableSteps = calcAvailableSteps(stepsStrike);
  const canMove = canAnyMove(shipsMine, shipsOpp, availableSteps);
  return {
    side,
    turnSide,
    isPlayersTurn: turnSide === side,
    stepsStrike,
    availableSteps,
    shipsMine,
    shipsOpp,
    canMove,
  };
}

function hashSnapshot(s: Snapshot): string {
  const sMine = Object.entries(s.shipsMine).sort(([a], [b]) => a.localeCompare(b));
  const sOpp = Object.entries(s.shipsOpp).sort(([a], [b]) => a.localeCompare(b));
  return JSON.stringify({
    turnSide: s.turnSide,
    stepsStrike: s.stepsStrike,
    availableSteps: s.availableSteps,
    shipsMine: sMine,
    shipsOpp: sOpp,
    canMove: s.canMove,
  });
}

function buildShipStatuses(
  mine: Record<string, ShipPos>,
  opp: Record<string, ShipPos>,
  steps: number[],
) {
  const hasSimpleOnHand = Object.entries(mine).some(
    ([id, pos]) => !isMother(id) && String(pos) === "hand",
  );
  const motherActive = !hasSimpleOnHand;
  const res: Record<string, ShipStatus> = {};
  for (const [id, pos] of Object.entries(mine)) {
    const ok = canShipMove(id, pos, steps, mine, opp, motherActive);
    res[id] = ok ? "canMove" : "blocked";
  }
  return res;
}

export function initMainPrediction(roomId: Room["id"]): () => void {
  let prevHash: string | null = null;
  let prevStatuses: Record<string, ShipStatus> | null = null;
  let prevTurnSide: Side | undefined;
  let lastSentSteps: { side: Side; json: string } | null = null;

  const unsub = listeToRoomById(roomId, async (room: Room | undefined) => {
    if (!room) return;

    const turnSide = room.isTurn as Side | undefined;
    if (!turnSide) return;

    const last = (room as RoomWithLastDice).lastDiceResult;
    if (last === 6) return;

    const snap = buildSnapshot(room, turnSide);
    const h = hashSnapshot(snap);

    if (prevTurnSide !== snap.turnSide && prevTurnSide !== undefined) {
      await safeUpdate(roomId, {
        "shipsState/left": null,
        "shipsState/right": null,
        "currentStepsStrike/left": [],
        "currentStepsStrike/right": [],
        "canPlayerMoveShips/left": null,
        "canPlayerMoveShips/right": null,
      });
      prevStatuses = null;
    }

    prevTurnSide = snap.turnSide;

    const nowJson = JSON.stringify(snap.stepsStrike);
    if (!lastSentSteps || lastSentSteps.side !== turnSide || lastSentSteps.json !== nowJson) {
      await safeUpdate(roomId, {
        [`currentStepsStrike/${turnSide}`]: snap.stepsStrike,
      } as FirebasePatch);
      lastSentSteps = { side: turnSide, json: nowJson };
    }

    if (snap.stepsStrike.length > 0) {
      const statuses = buildShipStatuses(snap.shipsMine, snap.shipsOpp, snap.availableSteps);
      const patch: FirebasePatch = {};

      for (const [shipId, status] of Object.entries(statuses)) {
        if (!prevStatuses || prevStatuses[shipId] !== status) {
          (patch as Record<string, ShipStatus>)[`shipsState/${turnSide}/${shipId}`] = status;
        }
      }

      const can = Object.values(statuses).some((s) => s === "canMove");
      patch[`canPlayerMoveShips/${turnSide}`] = can;

      if (!can) {
        patch[`currentStepsStrike/${turnSide}`] = [];
        const idx = turnSide === "left" ? 0 : 1;
        if (Array.isArray(room.players) && room.players[idx]) {
          patch[`players/${idx}/diceStreak`] = [];
        }
        lastSentSteps = { side: turnSide, json: "[]" };
      }

      if (Object.keys(patch).length) {
        await safeUpdate(roomId, patch);
        prevStatuses = statuses;
      }
    }

    if (prevHash !== h) {
      prevHash = h;
    }
  });

  return typeof unsub === "function" ? unsub : () => {};
}

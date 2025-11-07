import { listeToRoomById, clearCurrentStepsStrikeForTurn } from "../server/server";
import type { Room } from "../types/room";
import type { Side } from "../types/room";
import { HelperTypes, triggerHelper } from "./helper";
import { HELPER_NOT_YOUR_TURN_DURATION } from "../config";

type CanMoveMap = Partial<Record<Side, boolean>>;
type Unsubscribe = (() => void) | undefined;
type RoomWithCan = Room & { canPlayerMoveShips?: CanMoveMap };

type ShipsBySide = Record<string, string>;
type RoomShips = Partial<Record<Side, ShipsBySide>>;

function isMotherShip(id: string) {
  return /-cell-8$/.test(id);
}

function getFieldIndex(loc: string): number | null {
  const m = typeof loc === "string" ? loc.match(/field-(\d+)/) : null;
  return m ? Number(m[1]) : null;
}

function isNormalFieldIndex(n: number) {
  return (
    (n >= 1 && n <= 5) ||
    (n >= 7 && n <= 11) ||
    (n >= 13 && n <= 17) ||
    (n >= 18 && n <= 23)
  );
}

function evaluateBlockType(ships: RoomShips | undefined, side: Side) {
  const sideShips = ships?.[side] || {};
  const normalFields: number[] = [];

  for (const [shipId, loc] of Object.entries(sideShips)) {
    if (isMotherShip(shipId)) continue;
    const idx = getFieldIndex(loc);
    if (idx == null) continue;
    if (isNormalFieldIndex(idx)) normalFields.push(idx);
  }

  if (normalFields.length >= 2) {
    return { type: "PENALTY" as const, minField: Math.min(...normalFields) };
  }

  return { type: "SIMPLE" as const, minField: null as number | null };
}

export function initPlayerBlockedInfo(roomId: Room["id"]): () => void {
  let prevTurn: Side | undefined;
  let wasShown = false;

  const off = listeToRoomById(roomId, (room: Room | undefined) => {
    if (!room) return;

    const turn = room.isTurn as Side | undefined;
    if (!turn) {
      prevTurn = undefined;
      wasShown = false;
      return;
    }

    if (prevTurn && prevTurn !== turn) {
      wasShown = false;
    }
    prevTurn = turn;

    const can = (room as RoomWithCan).canPlayerMoveShips?.[turn];
    if (can == null) {
      wasShown = false;
      return;
    }

    if (can === false && !wasShown) {
      const { type, minField } = evaluateBlockType((room as any).ships as RoomShips, turn);
      const sideLabel =
        turn === "left" ? "Гравець Left заблокований" : "Гравець Right заблокований";
      const text =
        type === "PENALTY"
          ? `${sideLabel} — PENALTY (min field: ${minField})`
          : `${sideLabel} — SIMPLE`;

      if (type === "SIMPLE") {
        void clearCurrentStepsStrikeForTurn(roomId);
      }

      triggerHelper({
        duration: HELPER_NOT_YOUR_TURN_DURATION,
        text,
        type: HelperTypes.HELPER_WARNING,
      });

      wasShown = true;
    }
  }) as Unsubscribe;

  return () => {
    off?.();
  };
}

import { listeToRoomById } from "../server/server";
import type { Room } from "../types/room";
import type { Side, ShipPos } from "../types/room";
import { HelperTypes, triggerHelper } from "./helper";
import { helper } from "../config";

type Unsubscribe = (() => void) | undefined;

type RoomWithShips = Room & {
  ships?: Partial<Record<Side, Record<string, ShipPos>>>;
};

function allShipsInFinal0(room: RoomWithShips, side: Side): boolean {
  const group = room.ships?.[side];
  if (!group) return false;

  const prefix = side === "left" ? "p1" : "p2";
  const re = new RegExp(`^${prefix}-cell-\\d+$`);

  const values = Object.entries(group)
    .filter(([k, v]) => re.test(k) && v != null)
    .map(([, v]) => String(v).trim());

  if (values.length !== 8) return false;
  return values.every((v) => v === "final-0");
}

export function initPlayerWin(roomId: Room["id"]): () => void {
  let prevWinner: Side | null = null;

  const off = listeToRoomById(roomId, (room: Room | undefined) => {
    if (!room) {
      prevWinner = null;
      return;
    }

    const r = room as RoomWithShips;
    const leftWon = allShipsInFinal0(r, "left");
    const rightWon = allShipsInFinal0(r, "right");

    let winner: Side | null = null;
    if (leftWon) winner = "left";
    else if (rightWon) winner = "right";

    if (winner && prevWinner !== winner) {
      triggerHelper({
        duration: 4000,
        text: helper("helper.win", { side: winner }),
        type: HelperTypes.HELPER_INFORM,
        priority: 10,
        dedupeKey: `win:${winner}`,
        delayBeforeShow: 0,
      });
      prevWinner = winner;
    }

    if (!winner) {
      prevWinner = null;
    }
  }) as Unsubscribe;

  return () => {
    off?.();
  };
}

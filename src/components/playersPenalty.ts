import { listeToRoomById, clearCurrentStepsStrikeForTurn } from "../server/server";
import type { Room } from "../types/room";
import type { Side } from "../types/room";
import { HelperTypes, triggerHelper } from "./helper";
import { HELPER_NOT_YOUR_TURN_DURATION } from "../config";
import { HIDE_DICE_DELAY } from "./dice";

type CanMoveMap = Partial<Record<Side, boolean>>;
type Unsubscribe = (() => void) | undefined;
type RoomWithCan = Room & { canPlayerMoveShips?: CanMoveMap };

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
      const sideLabel = turn === "left" ? "Гравець Left заблокований" : "Гравець Right заблокований";

      void clearCurrentStepsStrikeForTurn(roomId);

      triggerHelper({
        duration: HELPER_NOT_YOUR_TURN_DURATION,
        text: `${sideLabel} — SIMPLE`,
        type: HelperTypes.HELPER_WARNING,
        delayBeforeShow: room.isDiceRolling ? HIDE_DICE_DELAY + 300 : 300,
        priority: 0,
        dedupeKey: `blocked:${turn}`,
      });

      wasShown = true;
    }
  }) as Unsubscribe;

  return () => {
    off?.();
  };
}

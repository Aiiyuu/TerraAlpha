import { listeToRoomById } from "../server/server";
import type { Room } from "../types/room";
import type { Side, ShipPos } from "../types/room";
import { fireLoserScreen, fireWinnerScreen } from "./endGame";

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

let gameIsFinished = false;

export function initPlayerWin(
  roomId: Room["id"],
  currentPlayerSide: Side
): () => void {
  const off = listeToRoomById(roomId, (room: Room | undefined) => {
    if (!room) return;

    const r = room as RoomWithShips;
    const leftWon = allShipsInFinal0(r, "left");
    const rightWon = allShipsInFinal0(r, "right");

    let winner: Side | null = null;

    if (leftWon) winner = "left";
    else if (rightWon) winner = "right";

    if (winner && !gameIsFinished) {
      console.log(
        `Winner: ${winner}, Typeof Winner: ${typeof winner}\nCurrent Player Side: ${currentPlayerSide}, Type of player side: ${typeof currentPlayerSide}`
      );

      if (winner === currentPlayerSide) {
        fireWinnerScreen();
      } else {
        fireLoserScreen();
      }

      gameIsFinished = true;
    }
  }) as Unsubscribe;

  return () => {
    off?.();
  };
}

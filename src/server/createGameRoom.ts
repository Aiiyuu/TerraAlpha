import { getRandomId } from "../utility/getRandomId.ts";
import type { RoomEntry } from "../types/room.ts";
import type { PlayerEntry } from "../types/player.ts";
import { setCurrentRoomId, writeRoomData } from "./server.ts";
import { createNewPlayer } from "./player.ts";
import { animatePageSwitching, showGame } from "../components/pageSwitcher.ts";
import { getRandomSide } from "../components/coin.ts";

/**
 * Creates a new room with player and pushes it to the server
 */
export async function createRoom() {
  const roomNameInput = document.getElementById("room-name") as HTMLInputElement;
  const player: PlayerEntry = createNewPlayer();

  const firstTurnSide = getRandomSide();

  const newRoom: RoomEntry = {
    id: getRandomId(),
    name: roomNameInput.value || "Без назви",
    players: [],
    gameStarted: false,
    isDiceRolling: false,
    lastDiceResult: -1,
    timerState: new Date().toISOString(),
    isTurn: firstTurnSide,
    coinShown: true,
    coin: {
      result: firstTurnSide,
      shown: true,
      at: new Date().toISOString(),
    },
  } as any;

  setCurrentRoomId(newRoom.id);

  await writeRoomData(newRoom, player);

  animatePageSwitching(() => showGame(newRoom));

  return newRoom;
}

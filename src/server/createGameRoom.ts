import { getRandomId } from "../utility/getRandomId.ts";
import type { RoomEntry } from "../types/room.ts";
import type { PlayerEntry } from "../types/player.ts";
import { setCurrentRoomId, setRestartRoomId, writeRoomData } from "./server.ts";
import { createNewPlayer } from "./player.ts";
import { animatePageSwitching, showGame } from "../components/pageSwitcher.ts";
import { getRandomSide } from "../components/coin.ts";
import { initShipSync } from "../components/ShipSync.ts";

export async function createRoom() {
  const roomNameInput = document.getElementById(
    "room-name"
  ) as HTMLInputElement;
  const player: PlayerEntry = createNewPlayer();

  const firstTurnSide = getRandomSide();

  const newRoom: RoomEntry = {
    id: getRandomId(),
    name: roomNameInput.value || `Room-${getRandomId()}`,
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
  };

  setCurrentRoomId(newRoom.id);
  await writeRoomData(newRoom, player);

  initShipSync(String(newRoom.id));

  animatePageSwitching(() => showGame(newRoom));

  return newRoom;
}

export async function createRestartRoom() {
  const roomNameInput = document.getElementById(
    "room-name"
  ) as HTMLInputElement;
  const player: PlayerEntry = createNewPlayer();

  const firstTurnSide = getRandomSide();

  const newRoom: RoomEntry = {
    id: getRandomId(),
    name: roomNameInput.value || `Room-${getRandomId()}`,
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
  };

  setRestartRoomId(newRoom.id);
  await writeRoomData(newRoom, player, true);

  return newRoom;
}

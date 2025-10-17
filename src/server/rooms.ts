import { getRandomId } from "../utility/getRandomId.ts";
import type { RoomEntry } from "../types/room.ts";
import type { PlayerEntry } from "../types/player.ts";
import { setCurrentRoomId, writeRoomData } from "./server.ts";
import { createNewPlayer } from "./player.ts";
import { animatePageSwitching, showGame } from "../components/pageSwitcher.ts";

/**
 * Creates a new room with player and pushes it to the server
 */
export async function createRoom() {
  const roomNameInput = document.getElementById("room-name") as HTMLInputElement;
  const player: PlayerEntry = createNewPlayer();
  const newRoom: RoomEntry = {
    id: getRandomId(),
    name: roomNameInput.value,
    players: [],
  };

  setCurrentRoomId(newRoom.id);

  // Wait until the room is written to the database
  await writeRoomData(newRoom, player);

  // Animate only after room creation is confirmed
  animatePageSwitching(() => showGame(newRoom));

  return newRoom;
}

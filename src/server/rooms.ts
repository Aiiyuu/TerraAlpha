import { getRandomId } from "../utility/getRandomId.ts";
import type { RoomEntry } from "../types/room.ts";
import type { PlayerEntry } from "../types/player.ts";
import { writeRoomData } from "./server.ts";
import { createNewPlayer } from "./player.ts";

/**
 * Creates a new room with player and pushes it to the server
 */
export function createRoom() {
  const roomNameInput = document.getElementById(
    "room-name"
  ) as HTMLInputElement;
  const player: PlayerEntry = createNewPlayer();
  const newRoom: RoomEntry = {
    id: getRandomId(),
    name: roomNameInput.value,
    players: [],
  };

  // Write room data to the database
  writeRoomData(newRoom, player);

  return newRoom;
}
import { getRandomId } from "../utility/getRandomId.ts";
import { rooms } from "../api/rooms.ts";
import type { Room } from "../types/room.ts";
import type { Player } from "../types/player.ts";
import { addRoomToServer } from "./server.ts";
import { createNewPlayer } from "./player.ts";

/**
 * Creates a new room with player and pushes it to the server
 */
export function createRoom() {
  const roomNameInput = document.getElementById(
    "room-name"
  ) as HTMLInputElement;
  const player: Player = createNewPlayer();

  const newRoom: Room = {
    id: getRandomId(),
    authorId: player.id,
    name: roomNameInput.value,
    players: [player],
    date: new Date(),
  };

  addRoomToServer(newRoom);
}

/**
 * Adds player to the room
 */
export function addNewPlayerToRoom(
  roomId: number,
  newPlayer: Player
): Room | undefined {
  const room: Room | undefined = getRoomById(roomId)

  if (!room) {
    alert("Кімната не знайдена");
    return;
  }

  if (room.players.length >= 2) {
    alert("Ця кімната вже переповнена");
    return;
  }

  room.players.push(newPlayer);
  return room;
}

/**
 * Returns a random room from rooms
 */
export function getRandomRoom(currentPlayer: Player): Room {
  const availableRooms = rooms.filter((room) => {
    return (
      room.players.length < 2 && room.players[0].color !== currentPlayer.color
    );
  });

  const randomIndex = Math.floor(Math.random() * availableRooms.length);
  return availableRooms[randomIndex];
}

export function getRoomById(id: Room['id']): Room | undefined {
  return rooms.find((item) => item.id === id);
}
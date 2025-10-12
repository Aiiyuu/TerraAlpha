import { getRandomId } from "../utility/getRandomId.ts";
import type { Room } from "../types/room.ts";
import type { Player } from "../types/player.ts";
import { addRoomToServer } from "./server.ts";

export function createRoom() {
  const roomNameInput = document.getElementById('room-name') as HTMLInputElement;
  const playerNameInput = document.getElementById('player-name') as HTMLInputElement;
  const playerColorInput = document.getElementById('color') as HTMLInputElement;

  const newPlayer: Player = {
    id: getRandomId(),
    avatar: getAvatarId(),
    name: playerNameInput.value,
    itsTurn: true,
    diceHistory: [],
    diceStreak: [],
    color: playerColorInput.value,
  }

  const newRoom: Room = {
    id: getRandomId(),
    authorId: newPlayer.id,
    name: roomNameInput.value,
    players: [newPlayer],
    date: new Date(),
  }

  addRoomToServer(newRoom);
}


/**
 * finds and returns selected avatar id;
 */
function getAvatarId() {
  const avatars = [...document.querySelectorAll('.avatar-dropdown-item')] as HTMLImageElement[];
  let id = 0;

  avatars.forEach(avatar => {
    if (avatar.classList.contains('is-selected')) {
      id = Number(avatar.getAttribute('data-id'));
    }
  });

  return id;
}
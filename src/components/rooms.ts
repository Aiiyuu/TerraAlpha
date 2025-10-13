import { rooms } from "../api/rooms.ts";
import { avatars } from "../config.ts";
import type { Player } from "../types/player.ts";
import type { Avatar } from "../types/avatar.ts";
import { timeAgo } from "../utility/getFormattedDate.ts";

const table = document.getElementById("rooms-table") as HTMLTableElement;

/**
 * Creates a table of rooms
 */
export function setUpRoomsTable() {
  rooms.forEach((room) => {
    const author: Player | undefined = room.players.find(player => player.id === room.authorId);
    const avatar: Avatar = avatars.find(avatar => avatar.id === author!.avatar) || avatars[0];

    const roomTag = `
    <tr class="select-room-button" style="--author-color: ${author?.color}" data-room-id="${room.id}">
      <td><img src="${avatar.img}"></td>
      <td>${room.name}</td>
      <td>${author?.name}</td>
      <td>${timeAgo(String(room.date))}</td>
      <td>${room.players.length}/2</td>
    </tr>
    `;

    table.innerHTML += roomTag;
  });
}
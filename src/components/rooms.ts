import { rooms } from "../api/rooms.ts";
import { avatars } from "../config.ts";
import type { Player } from "../types/player.ts";
import type { Avatar } from "../types/avatar.ts";
import { timeAgo } from "../utility/getFormattedDate.ts";

const table = document.getElementById("table") as HTMLTableElement;

/**
 * Creates a table of rooms
 */
export function setUpRoomsTable() {
  let roomTags = "";

  if (!rooms.length) {
    table.innerHTML = `
      <h2 class="rooms-not-found">Назнайдено вільних місць</h2>
    `;
    return;
  }

  rooms.forEach((room) => {
    const author: Player | undefined = room.players.find(
      (player) => player.id === room.authorId
    );

    const avatar: Avatar = avatars.find((avatar) => {
      return avatar.id === author!.avatar;
    }) || avatars[0];

    roomTags += `
    <tr class="select-room-button" style="--author-color: ${
      author?.color
    }" data-room-id="${room.id}">
      <td><img src="${avatar.img}" alt="${author?.name}'s avatar"></td>
      <td>${room.name}</td>
      <td>${author?.name}</td>
      <td>${timeAgo(String(room.date))}</td>
      <td>${room.players.length}/2</td>
    </tr>
    `;
  });

  table.innerHTML = `
  <table class="rooms-table">
    <thead>
      <tr>
        <th></th>
        <th>Назва</th>
        <th>Автор</th>
        <th>Дата</th>
        <th>Ігроки</th>
      </tr>
    </thead>

    <tbody id="rooms-table">
      ${roomTags} <!-- Insert all the rows here -->
    </tbody>
  </table>
  `;
}

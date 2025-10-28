import { avatars } from "../config.ts";
import type { Player } from "../types/player.ts";
import type { Avatar } from "../types/avatar.ts";
import { timeAgo } from "../utility/getFormattedDate.ts";
import {
  addNewPlayerToRoom,
  getRoomById,
  listenToRooms,
  setCurrentRoomId,
} from "../server/server.ts";
import type { Room } from "../types/room.ts";
import { createNewPlayer } from "../server/player.ts";
import { animatePageSwitching, showGame } from "./pageSwitcher.ts";

const table = document.getElementById("table") as HTMLTableElement;

/**
 * Creates a table of rooms
 */
export function setUpRoomsTable() {
  listenToRooms(generateTable);
}

function generateTable(rooms: Room[]) {
  // Clear the existing table or content first
  table.innerHTML = "";
  let roomTags = "";

  if (!rooms.length) {
    table.innerHTML = `
      <h2 class="rooms-not-found">Назнайдено вільних місць</h2>
    `;
    return;
  }

  rooms.forEach((room) => {
    const players = Array.isArray(room.players) ? room.players : [];

    const author: Player | undefined = players.find(
      (player) => player.id === room.authorId
    );

    const avatar: Avatar =
      avatars.find((avatar) => avatar.id === author?.avatar) || avatars[0];

    roomTags += `
    <tr class="select-room-button" style="--author-color: ${
      author?.color || "#ccc"
    }" data-room-id="${room.id}">
      <td><img src="${avatar.img}" alt="${
      author?.name || "Unknown"
    }'s avatar"></td>
      <td>${room.name || "Без назви"}</td>
      <td>${author?.name || "Невідомо"}</td>
      <td>${timeAgo(String(room.date))}</td>
      <td>${players.length}/2</td>
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
      <tbody id="rooms-table-body">
        ${roomTags}
      </tbody>
    </table>
  `;

  const roomButtons = table.querySelectorAll(".select-room-button");

  roomButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const roomId = Number(button.getAttribute("data-room-id"));
      setCurrentRoomId(roomId);

      if (roomId) {
        const newUser = createNewPlayer();

        try {
          // Wait for player to be added to room before continuing
          await addNewPlayerToRoom(newUser, roomId);

          // Then try to fetch the room
          const room = await getRoomById(roomId);

          if (room) {
            animatePageSwitching(() => showGame(room));
          } else {
            alert("Room not found.");
          }
        } catch (error) {
          alert(`Error during joining room: ${error}`);
          return;
        }
      }
    });
  });
}

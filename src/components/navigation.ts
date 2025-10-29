import { createRoom } from "../server/createGameRoom.ts";
import { createNewPlayer, getRandomColor } from "../server/player.ts";
import {
  addNewPlayerToRoom,
  getAllRooms,
  setCurrentRoomId,
} from "../server/server.ts";
import {
  animatePageSwitching,
  showCreateGamePage,
  showGame,
  showHomePage,
  showSelectGamePage,
} from "./pageSwitcher.ts";

const homeBtn = document.querySelector("#back-to-home") as HTMLElement;
const form = document.querySelector("#form") as HTMLElement;

/**
 * Setups the game navigation and adds event listeners to all needed buttons
 */
export function setUpNavigation() {
  const createGameBtn = document.querySelector(
    "#navigation-create-room-btn"
  ) as HTMLButtonElement;

  const selectGameBtn = document.querySelector(
    "#navigation-select-room-btn"
  ) as HTMLButtonElement;

  const fastGameBtn = document.querySelector(
    "#navigation-fast-game-btn"
  ) as HTMLButtonElement;

  createGameBtn.addEventListener("click", () => {
    animatePageSwitching(showCreateGamePage);
  });

  selectGameBtn.addEventListener("click", () => {
    animatePageSwitching(showSelectGamePage);
  });

  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    createRoom();
  });

  homeBtn.addEventListener("click", () => {
    animatePageSwitching(showHomePage);
  });

  fastGameBtn.addEventListener("click", async () => {
    if (fastGameBtn.disabled) return;
    fastGameBtn.disabled = true;

    try {
      const player = createNewPlayer();
      const rooms = await getAllRooms();
      const availableRooms = rooms.filter((room) => room.players.length < 2);

      if (availableRooms.length) {
        const oldestRoom = availableRooms.reduce((oldest, current) => {
          return new Date(current.date) < new Date(oldest.date)
            ? current
            : oldest;
        });

        while (oldestRoom.players[0].color === player.color) {
          player.color = getRandomColor();
        }

        await addNewPlayerToRoom(player, oldestRoom.id);
        setCurrentRoomId(oldestRoom.id);

        animatePageSwitching(() => showGame(oldestRoom));
      } else {
        createRoom();
      }
    } catch (error) {
      alert("Failded fast game: " + error);
    }
  });

  showHomePage();
}

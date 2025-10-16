import { fireRibbons, hideRibbons } from "./ribbons.ts";
import {
  addNewPlayerToRoom,
  createRoom,
  getRandomRoom,
  getRoomById,
} from "../server/rooms.ts";
import { createNewPlayer } from "../server/player.ts";
import type { Player } from "../types/player.ts";
import type { Room } from "../types/room.ts";
import { updateRoom } from "../server/server.ts";
import { startGame } from "./game.ts";
import { createSound } from "./sound.ts";
import swipeSound from "../assets/sounds/swipe.mp3";

import decoration1 from "../assets/images/decorations/decoration1.png";
import decoration2 from "../assets/images/decorations/decoration2.png";

const RIBBONS_ANIMATION_DURATION = 1000;

const homeBtn = document.querySelector("#back-to-home") as HTMLElement;
const roomField = document.querySelector("#room-field") as HTMLElement;
const createRoomBtn = document.querySelector("#create-room-btn") as HTMLElement;
const home = document.querySelector("#home") as HTMLElement;
const selectGamePage = document.querySelector("#form-section") as HTMLElement;
const roomsTable = document.querySelector("#table") as HTMLElement;
const game = document.querySelector("#game") as HTMLElement;
const form = document.querySelector("#form") as HTMLElement;

/**
 * Setups the game navigation and adds event listeners to all needed buttons
 */
export function setUpNavigation() {
  const fastGameBtn = document.querySelector(
    "#navigation-fast-game-btn"
  ) as HTMLElement;
  const selectGameBtn = document.querySelector(
    "#navigation-select-room-btn"
  ) as HTMLElement;
  const createGameBtn = document.querySelector(
    "#navigation-create-room-btn"
  ) as HTMLElement;

  selectGameBtn.addEventListener("click", () => {
    const roomBtns = [
      ...document.querySelectorAll(".select-room-button"),
    ] as HTMLElement[];

    roomBtns.forEach((roomBtn) => {
      roomBtn.addEventListener("click", () => {
        const roomId = Number(roomBtn.getAttribute("data-room-id"));
        const room: Room | undefined = getRoomById(roomId);
        const player: Player = createNewPlayer();

        if (room?.players[0].color === player.color) {
          alert("Ваш колір зайнятий! Оберіть інший колір або іншу кімнату");
          return;
        }

        const updatedRoom: Room | undefined = addNewPlayerToRoom(
          roomId,
          player
        );

        if (updatedRoom) {
          updateRoom(updatedRoom);

          startGame(updatedRoom.players[0], updatedRoom.players[1]);
          animatePageSwitching(showGame);
        }
      });
    });

    animatePageSwitching(showSelectGamePage);
  });

  createGameBtn.addEventListener("click", () => {
    animatePageSwitching(showCreateGamePage);
  });

  fastGameBtn.addEventListener("click", () => {
    const player: Player = createNewPlayer();
    const randomRoom: Room = getRandomRoom(player);

    if (!randomRoom) {
      alert(
        "Вільної кімнати де твій колір вільний не знайдено, створіть свою кімнату або оберіть інший колір."
      );
      return;
    }

    addNewPlayerToRoom(randomRoom.id, player);
    updateRoom(randomRoom);

    startGame(randomRoom.players[0], randomRoom.players[1]);
    animatePageSwitching(showGame);
  });

  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    console.log(true);
    createRoom();
    window.location.reload();
  });

  homeBtn.addEventListener("click", () => {
    animatePageSwitching(showHomePage);
  });

  showHomePage();
}

/**
 * Shows content needed to select game
 */
function showSelectGamePage() {
  roomField.classList.add("is-hidden");
  createRoomBtn.classList.add("is-hidden");
  home.classList.add("is-hidden");
  selectGamePage.classList.remove("is-hidden");
  roomsTable.classList.remove("is-hidden");

  document.body.style.backgroundImage = `url(${decoration2})`;
}

/**
 * Shows content needed to create game
 */
function showCreateGamePage() {
  roomsTable.classList.add("is-hidden");
  home.classList.add("is-hidden");
  selectGamePage.classList.remove("is-hidden");
  roomField.classList.remove("is-hidden");
  createRoomBtn.classList.remove("is-hidden");

  document.body.style.backgroundImage = `url(${decoration2})`;
}

/**
 * Shows content needed for the game itself
 */
function showGame() {
  home.classList.add("is-hidden");
  selectGamePage.classList.add("is-hidden");
  game.classList.remove("is-hidden");
}

/**
 * Show the home page
 */
function showHomePage() {
  home.classList.remove("is-hidden");
  selectGamePage.classList.add("is-hidden");

  document.body.style.backgroundImage = `url(${decoration1})`;
}

const { startSound } = createSound({
  src: swipeSound,
  infinite: false,
  loudness: 0.9,
});

/**
 * This page animates the page switching
 * @param callback
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
function animatePageSwitching(callback: Function) {
  fireRibbons();
  startSound();

  setTimeout(() => {
    callback();
    hideRibbons();
  }, RIBBONS_ANIMATION_DURATION);
}

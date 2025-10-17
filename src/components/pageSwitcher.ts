import { fireRibbons, hideRibbons } from "./ribbons.ts";
import { createSound } from "./sound.ts";
import swipeSound from "../assets/sounds/swipe.mp3";

import decoration1 from "../assets/images/decorations/decoration1.png";
import decoration2 from "../assets/images/decorations/decoration2.png";
import { startGame } from "./game.ts";
import type { RoomEntry } from "../types/room.ts";

const RIBBONS_ANIMATION_DURATION = 1000;

const roomField = document.querySelector("#room-field") as HTMLElement;
const createRoomBtn = document.querySelector("#create-room-btn") as HTMLElement;
const home = document.querySelector("#home") as HTMLElement;
const selectGamePage = document.querySelector("#form-section") as HTMLElement;
const roomsTable = document.querySelector("#table") as HTMLElement;
const game = document.querySelector("#game") as HTMLElement;

/**
 * Shows content needed to select game
 */
export function showSelectGamePage() {
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
export function showCreateGamePage() {
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
export function showGame(room: RoomEntry) {
  home.classList.add("is-hidden");
  selectGamePage.classList.add("is-hidden");
  game.classList.remove("is-hidden");

  startGame(room);
}

/**
 * Show the home page
 */
export function showHomePage() {
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
export function animatePageSwitching(callback: Function) {
  fireRibbons();
  startSound();

  setTimeout(() => {
    callback();
    hideRibbons();
  }, RIBBONS_ANIMATION_DURATION);
}
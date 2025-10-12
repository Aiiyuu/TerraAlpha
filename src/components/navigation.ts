import { fireRibbons, hideRibbons } from "./ribbons.ts";
import { createRoom } from "../server/rooms.ts";

const RIBBONS_ANIMATION_DURATION = 1000;

const roomField = document.querySelector('#room-field') as HTMLElement;
const createRoomBtn = document.querySelector('#create-room-btn') as HTMLElement;
const home = document.querySelector('#home') as HTMLElement;
const selectGamePage = document.querySelector('#form-section') as HTMLElement;
const roomsTable = document.querySelector('#available-rooms') as HTMLElement;
const game = document.querySelector('#game') as HTMLElement;
const form = document.querySelector('#form') as HTMLElement;

/**
 * Setups the game navigation and adds event listeners to all needed buttons
 */
export function setUpNavigation() {
  const fastGameBtn = document.querySelector("#navigation-fast-game-btn") as HTMLElement;
  const selectGameBtn = document.querySelector("#navigation-select-room-btn") as HTMLElement;
  const createGameBtn = document.querySelector("#navigation-create-room-btn") as HTMLElement;

  selectGameBtn.addEventListener("click", () => {
    animatePageSwitching(showSelectGamePage);
  });

  createGameBtn.addEventListener("click", () => {
    animatePageSwitching(showCreateGamePage);
  });

  fastGameBtn.addEventListener("click", () => {
    animatePageSwitching(showGame);
  });

  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    createRoom();
  });
}

/**
 * Shows content needed to select game
 */
function showSelectGamePage() {
  roomField.classList.add('is-hidden');
  createRoomBtn.classList.add('is-hidden');
  home.classList.add('is-hidden');
  selectGamePage.classList.remove('is-hidden');
}

/**
 * Shows content needed to create game
 */
function showCreateGamePage() {
  roomsTable.classList.add('is-hidden');
  home.classList.add('is-hidden');
  selectGamePage.classList.remove('is-hidden');
}

/**
 * Shows content needed for the game itself
 */
function showGame() {
  home.classList.add('is-hidden');
  game.classList.remove('is-hidden');
}

/**
 * This page animates the page switching
 * @param callback
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
function animatePageSwitching(callback: Function) {
  fireRibbons();

  setTimeout(() => {
    callback();
    hideRibbons();
  }, RIBBONS_ANIMATION_DURATION);
}
import { createRoom } from "../server/rooms.ts";
import {
  animatePageSwitching,
  showCreateGamePage,
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
  ) as HTMLElement;

  const selectGameBtn = document.querySelector(
    "#navigation-select-room-btn"
  ) as HTMLElement;

  createGameBtn.addEventListener("click", () => {
    animatePageSwitching(showCreateGamePage);
  });

  selectGameBtn.addEventListener("click", () => {
    animatePageSwitching(showSelectGamePage);
  });

  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    createRoom();
    showHomePage();
  });

  homeBtn.addEventListener("click", () => {
    animatePageSwitching(showHomePage);
  });

  showHomePage();
}

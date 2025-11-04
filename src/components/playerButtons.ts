import type { Side } from "../types/room";
import { setupMuteBtn } from "./audioManager";
import { setupDialog } from "./dialog";
import { setUpHelperBtn } from "./helper";
import { setupLanguage } from "./language";
import { setupResetBtn } from "./reset";

const section1 = document.querySelector("#player1") as HTMLElement;
const section2 = document.querySelector("#player2") as HTMLElement;

const navigationBtns = `
  <div class="btn-group">
    <button id="lng-btn" class="btn btn--purple"></button>
    <button id="helper-btn" class="btn btn--purple"></button>
    <button id="reset-btn" class="btn btn--purple">
      <img src="./src/assets/icons/reset.png" alt="reset" />
      <div id="reset-cooldown" class="reset-cooldown"></div>
    </button>
    <button id="mute-btn" class="btn btn--purple"></button>
  </div>
`;

const dialogBtn = `
  <div class="dialog">
    <div class="btn dialog-button" data-lng="throwPhrase"></div>
    <ul class="dialog-list"></ul>
  </div>
`;

export function setUpPlayerBtns(currentPlayerSide?: Side) {
  const wrapper1 = section1?.querySelector(".player-navigation") as HTMLElement;
  const wrapper2 = section2?.querySelector(".player-navigation") as HTMLElement;

  switch (currentPlayerSide) {
    default:
    case "left":
      wrapper1.innerHTML = navigationBtns;
      wrapper2.innerHTML = dialogBtn;
      break;
    case "right":
      wrapper1.innerHTML = dialogBtn;
      wrapper2.innerHTML = navigationBtns;
      break;
  }

  setupLanguage();
  setUpHelperBtn();
  setupResetBtn();
  setupDialog();
  setupMuteBtn();
}

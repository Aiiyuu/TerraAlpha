import type { Side } from "../types/room";
import { setupMuteBtn } from "./audioManager";
import { setupDialog } from "./dialog";
import { setUpHelperBtn } from "./helper";
import { setupLanguage } from "./language";
import { setupResetBtn } from "./reset";
import resetIcon from "../assets/icons/reset.png";

const section1 = document.querySelector("#player1") as HTMLElement;
const section2 = document.querySelector("#player2") as HTMLElement;

const navigationBtns = `
  <div class="btn-group">
    <button id="lng-btn" class="btn btn--purple"></button>
    <button id="helper-btn" class="btn btn--purple"></button>
    <button id="reset-btn" class="btn btn--purple">
      <img src="${resetIcon}" alt="reset" />
      <div id="reset-cooldown" class="reset-cooldown"></div>
    </button>
    <button id="mute-btn" class="btn btn--purple"></button>
  </div>

  <div class="game-menu is-hidden" role="dialog" aria-label="Game Menu" aria-hidden="true">
    <div class="gm-header">
      <span class="gm-title">Game Menu</span>
      <button class="gm-close" aria-label="Close">×</button>
    </div>

    <div class="gm-actions">
      <button class="gm-btn gm-exit">Exit</button>
      <button class="gm-btn gm-restart">Restart</button>
      <button class="gm-btn gm-yes is-hidden">Yes</button>
      <button class="gm-btn gm-no is-hidden">No</button>
    </div>

    <div class="gm-timer is-hidden">10</div>
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

  setupLanguage(["#lng-btn", "#header-lng-btn"]);
  setUpHelperBtn();
  setupResetBtn(currentPlayerSide);
  setupDialog();

  setupMuteBtn();
}

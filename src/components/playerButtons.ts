import type { Side } from "../types/room";
import { setupMuteBtn } from "./audioManager";
import { setupDialog } from "./dialog";
import { setUpHelperBtn } from "./helper";
import { setupLanguage } from "./language";
import { setupResetBtn } from "./reset";
import resetIcon from "../assets/icons/reset.png";
import muted from "../assets/icons/muted.png";
import unMuted from "../assets/icons/unmuted.png";
import { colorsThatShouldUseDarkFont } from "../config";
import { helperOffSVG, helperOnSVG } from "./helperSVG";

const section1 = document.querySelector("#player1") as HTMLElement;
const section2 = document.querySelector("#player2") as HTMLElement;

export const navigationBtns = (
  isMuted?: boolean,
  isHelperDisabled?: boolean,
  shouldBeDark?: boolean
) => {
  const iconColor = shouldBeDark ? "invert(1)" : "invert(0)";
  const helperIcon = isHelperDisabled ? helperOnSVG : helperOffSVG;
  const muteIcon = isMuted ? muted : unMuted;

  return `
    <div class="btn-group" style="position: relative; z-index: 50">
      <button id="lng-btn" class="btn btn--purple"></button>

      <button id="helper-btn" class="btn btn--purple">
        ${helperIcon}
      </button>

      <button id="reset-btn" class="btn btn--purple">
        <img src="${resetIcon}" style="filter: ${iconColor}" alt="reset" />
        <div id="reset-cooldown" class="reset-cooldown"></div>
      </button>

      <button id="mute-btn" class="btn btn--purple">
        <img src="${muteIcon}" style="filter: ${iconColor}" alt="mute" />
      </button>
    </div>

    <div class="game-menu is-hidden" role="dialog" aria-label="Game Menu" aria-hidden="true">
      <div class="gm-header">
        <span class="gm-title" data-lng="gameMenu"></span>
        <button class="gm-close" aria-label="Close">×</button>
      </div>

      <div class="gm-actions">
        <button class="gm-btn gm-exit" data-lng="exit"></button>
        <button class="gm-btn gm-restart" data-lng="restart"></button>
        <button class="gm-btn gm-yes is-hidden" data-lng="yes"></button>
        <button class="gm-btn gm-no is-hidden" data-lng="no"></button>
      </div>

      <div class="gm-timer is-hidden">10</div>
    </div>
  `;
};

const dialogBtn = (shouldBeDark?: boolean, isRight?: boolean) => {
  const textColor = shouldBeDark ? "#000" : "#fff";

  return `
    <div class="dialog">
      <div class="btn dialog-button ${
        shouldBeDark && "is-dark"
      }" data-lng="throwPhrase" style="color: ${textColor}"></div>
      <ul class="dialog-list ${
        isRight && "is-right"
      }" style="color: ${textColor}"></ul>
    </div>
  `;
};

let prevColor: string | undefined;

export function setUpPlayerBtns(currentPlayerSide?: Side, color?: string) {
  const wrapper1 = section1?.querySelector(".player-navigation") as HTMLElement;
  const wrapper2 = section2?.querySelector(".player-navigation") as HTMLElement;

  const isMuted = localStorage.getItem("is-muted") === "true";
  const isHelperDisabled = localStorage.getItem("helperIsDisabled") === "false";

  if (prevColor === undefined && color) {
    prevColor = color;
  }

  let isIconDark = false;
  let isColorDark = false;

  switch (currentPlayerSide) {
    default:
    case "left":
      isIconDark = colorsThatShouldUseDarkFont.includes(prevColor || "");
      isColorDark = colorsThatShouldUseDarkFont.includes(color || "");

      wrapper1.innerHTML = navigationBtns(
        isMuted,
        isHelperDisabled,
        isIconDark
      );
      wrapper2.innerHTML = dialogBtn(isColorDark, true);
      break;
    case "right":
      isIconDark = colorsThatShouldUseDarkFont.includes(color || "");
      isColorDark = colorsThatShouldUseDarkFont.includes(prevColor || "");

      wrapper1.innerHTML = dialogBtn(isColorDark);
      wrapper2.innerHTML = navigationBtns(
        isMuted,
        isHelperDisabled,
        isIconDark
      );
      break;
  }

  setupLanguage(["#lng-btn", "#header-lng-btn"]);
  setUpHelperBtn();
  setupResetBtn(currentPlayerSide);
  setupDialog();
  setupMuteBtn();
}

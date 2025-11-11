import astronautImg from "../assets/images/decorations/astronaut.png";
import planetImg from "../assets/images/decorations/planet1.png";
import cometImg from "../assets/images/decorations/comet.png";
import rocketImg from "../assets/images/decorations/rocket.png";
import starImg from "../assets/images/decorations/star.png";
import diceIcon from "../assets/icons/dice.png";
import resetIcon from "../assets/icons/reset.png";
import bgImage from "../assets/images/bg_main.jpg";
import { getBlockedCursor, getPointerCursor, getRegularCursor } from "./cursor";

const astronaut: HTMLElement | null = document.querySelector(".astronaut");
const planet1: HTMLElement | null = document.querySelector(".planet-1");
const comet: HTMLElement | null = document.querySelector(".comet");
const rocket: HTMLElement | null = document.querySelector(".rocket");
const star: HTMLElement | null = document.querySelector(".star");
const restartBtn: HTMLElement | null = document.querySelector("#reset-btn");
const game: HTMLElement | null = document.querySelector("#game");

export function loadImages() {
  if (game) {
    game.style.backgroundImage = `url(${bgImage})`;
  }

  if (restartBtn) {
    const img = document.createElement("img");
    img.src = resetIcon;

    restartBtn.append(img);
  }

  if (astronaut) {
    astronaut.style.backgroundImage = `url(${astronautImg})`;
  }

  if (planet1) {
    planet1.style.backgroundImage = `url(${planetImg})`;
  }

  if (comet) {
    comet.style.backgroundImage = `url(${cometImg})`;
  }

  if (rocket) {
    rocket.style.backgroundImage = `url(${rocketImg})`;
  }

  if (star) {
    star.style.backgroundImage = `url(${starImg})`;
  }

  const style = document.createElement("style");
  style.textContent = `
    body {
      cursor: ${getRegularCursor()};
    }

    .steps-btn,
    .board .cell > .cell-btn,
    .btn,
    .dialog-button,
    .dialog-list-item,
    .form-field,
    .gm-close,
    .gm-btn,
    .cell-btn,
    .rooms-table tbody tr,
    .hand-grid .cell-btn,
    .board .cell:has(.ta-bump),
    .avatar-item {
      cursor: ${getPointerCursor()};
    }

    .steps-btn:disabled,
    #main-btn.disabled,
    .cell-btn[data-ship="mother"][disabled],
    .cell-btn[data-ship="mother"][disabled]:hover,
    .cell-btn[data-ship="mother"][disabled]:focus,
    .cell-btn[data-ship="mother"][disabled]:focus-visible,
    .cell-btn[data-ship="mother"][disabled]:active,
    .hand-grid .cell-btn.is-disabled,
    .board .cell > .cell-btn.is-disabled,
    .ship.is-disabled,
    [data-ship].is-disabled,
    .is-disabled,
    body.side-left .cell-btn[data-side="right"],
    body.side-left .hand-grid .cell-btn[data-side="right"],
    body.side-right .cell-btn[data-side="left"],
    body.side-right .hand-grid .cell-btn[data-side="left"] {
      cursor: ${getBlockedCursor()};
    }

    #main-btn[data-type="dice"]::after {
      background-image: url(${diceIcon});
    }
  `;

  document.head.appendChild(style);
}

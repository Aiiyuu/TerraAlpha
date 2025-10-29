import astronautImg from "../assets/images/decorations/astronaut.png";
import planetImg from "../assets/images/decorations/planet1.png";
import cometImg from "../assets/images/decorations/comet.png";
import rocketImg from "../assets/images/decorations/rocket.png";
import starImg from "../assets/images/decorations/star.png";
import diceIcon from "../assets/icons/dice.png";
import mutedIcon from "../assets/icons/muted.png";
import unMutedIcon from "../assets/icons/unmuted.png";

const astronaut: HTMLElement | null = document.querySelector(".astronaut");
const planet1: HTMLElement | null = document.querySelector(".planet-1");
const comet: HTMLElement | null = document.querySelector(".comet");
const rocket: HTMLElement | null = document.querySelector(".rocket");
const star: HTMLElement | null = document.querySelector(".star");

export function loadImages() {
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
    #main-btn[data-type="dice"]::after {
      background-image: url(${diceIcon});
    }

    #mute-btn[data-is-muted="true"]::after {
      background-image: url(${mutedIcon});
    }

    #mute-btn[data-is-muted="false"]::after {
      background-image: url(${unMutedIcon});
    }
  `;

  document.head.appendChild(style);
}

import { toggleRibbons } from "./ribbons.ts";
import swipeSound from "../assets/sounds/swipe.mp3";
import { createSound } from "./sound.ts";

const navbar = document.querySelector(".nav") as HTMLElement;
const navbarMenuBtn = document.querySelector(".nav-menu-btn") as HTMLElement;
const navbarLineWrapper = document.querySelector(".nav-lines") as HTMLElement;

/**
 * This function is responsible for setting up an adaptive menu on small devices
 */
export function setupAdaptiveMenuBtn() {
  for (let i = 0; i < 3; i++) {
    const line: HTMLSpanElement = document.createElement("span");
    line.classList.add("nav-line");

    navbarLineWrapper.appendChild(line);
  }

  const { startSound } = createSound({
    src: swipeSound,
    infinite: false,
    loudness: 0.9,
  });

  navbarMenuBtn.addEventListener("click", () => {
    startSound();

    navbar.classList.toggle("is-active");
    toggleRibbons();
  });
}

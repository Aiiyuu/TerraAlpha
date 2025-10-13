import { toggleRibbons } from "./ribbons.ts";

const navbar = document.querySelector('.nav') as HTMLElement;
const navbarMenuBtn = document.querySelector('.nav-menu-btn') as HTMLElement;
const navbarLineWrapper = document.querySelector('.nav-lines') as HTMLElement;

/**
 * This function is responsible for setting up an adaptive menu on small devices
 */
export function setupAdaptiveMenuBtn() {
  for (let i = 0; i < 3; i++) {
    const line: HTMLSpanElement = document.createElement("span");
    line.classList.add("nav-line");

    navbarLineWrapper.appendChild(line);
  }

  navbarMenuBtn.addEventListener('click', () => {
    navbar.classList.toggle("is-active");
    toggleRibbons();
  });
}
import { throwDice, setupDice } from "./components/dice";

/* Wait until the initial HTML document is fully loaded and parsed,
so we can safely select DOM elements and attach event listeners. */
window.addEventListener("load", () => {
  const diceBtns: Element[] = [...document.querySelectorAll(".dice-button")];

  // Create Dice object when the page is loaded
  setupDice();

  diceBtns.forEach((btn) => btn.addEventListener("click", throwDice));
});


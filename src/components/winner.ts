import { setupConfetti } from "./confetti";
import { setupFireworks } from "./fireworks";
import { setupWinnerRobotSvg } from "./winnerRobotSVG";

export function fireWinnerSection() {
  const robot = document.querySelector(".winner-robot") as HTMLElement;
  const winnerEffects = document.querySelector(
    ".winner-section "
  ) as HTMLElement;

  robot.classList.remove("is-hidden");
  winnerEffects.classList.remove("is-hidden");

  setupFireworks();
  setupConfetti();
  setupWinnerRobotSvg();
  showEndGameScreen();
}

function showEndGameScreen() {
  const endGameScreen = document.querySelector(
    ".end-game-section"
  ) as HTMLElement;

  endGameScreen.classList.remove("is-hidden");
}

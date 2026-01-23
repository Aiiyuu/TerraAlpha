import { setupConfetti } from "./confetti";
import { setupFireworks } from "./fireworks";
import { setupLoserRobotSvg } from "./loserRobotSVG";
import { createSound } from "./sound";
import { setupWinnerRobotSvg } from "./winnerRobotSVG";
import winnerMusic from "../assets/sounds/winner.mp3";
import loserMusic from "../assets/sounds/loser.mp3";

export function fireWinnerScreen() {
  const winnerMsg = document.querySelector(".winner-msg") as HTMLElement;
  const robot = document.querySelector(".winner-robot") as HTMLElement;
  const winnerEffects = document.querySelector(
    ".winner-section "
  ) as HTMLElement;

  showElements(robot, winnerMsg, winnerEffects);
  setupFireworks();
  setupConfetti();
  setupWinnerRobotSvg();
  showEndGameScreen();
  playWinnerMusic();
}

export function fireLoserScreen() {
  const loserMsg = document.querySelector(".loser-msg") as HTMLElement;
  const robot = document.querySelector(".loser-robot") as HTMLElement;
  const loserEffects = document.querySelector(".loser-section") as HTMLElement;

  showElements(robot, loserMsg, loserEffects);
  showEndGameScreen();
  setupLoserRobotSvg();
  playLoserMusic();
}

function showEndGameScreen() {
  const endGameScreen = document.querySelector(
    ".end-game-section"
  ) as HTMLElement;

  endGameScreen.classList.remove("is-hidden");
}

function showElements(...args: HTMLElement[]) {
  for (const el of args) {
    el.classList.remove("is-hidden");
  }
}

function playWinnerMusic() {
  const { startSound } = createSound({
    src: winnerMusic,
    loudness: 0.5,
    infinite: false,
  });

  startSound();
}

function playLoserMusic() {
  const { startSound } = createSound({
    src: loserMusic,
    loudness: 0.5,
    infinite: false,
  });

  startSound();
}

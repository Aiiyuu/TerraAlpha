import coinSoundSrc from "../assets/sounds/coin.mp3";
import { COIN_RESULT_DURATION, helper } from "../config";
import type { Room, Side } from "../types/room";
import { HelperTypes, triggerHelper } from "./helper";
import { createSound } from "./sound";

let coinContainer: HTMLElement | null = null;
let coin: HTMLElement | null = null;

const COIN_FLIP_DELAY = 500;
export const COIN_ANIMATION_DURATION = 5000 + COIN_FLIP_DELAY;

let isFlipping = false;
let lastSide: "left" | "right" | null = null;

function ensure(): boolean {
  if (!coinContainer)
    coinContainer = document.querySelector(
      ".coin-container"
    ) as HTMLElement | null;
  if (!coin) coin = document.querySelector(".coin") as HTMLElement | null;
  return !!(coinContainer && coin);
}

export function initCoin(): void {
  ensure();
}

const { startSound, stopSound } = createSound({
  src: coinSoundSrc,
  infinite: true,
});

export function flipCoin(side: Side) {
  if (!ensure()) return;
  if (isFlipping || side === lastSide) return;

  isFlipping = true;
  lastSide = side;
  startSound();

  coinContainer!.classList.add("is-active");

  (coin as HTMLElement).style.transition = "none";
  (coin as HTMLElement).style.transform =
    "rotateX(0deg) rotateY(0deg) rotateZ(0deg)";
  void (coin as HTMLElement).offsetWidth;
  (coin as HTMLElement).style.transition = "transform 5s ease";

  setTimeout(() => {
    const deg = side === "left" ? 3600 : 3780;
    (coin as HTMLElement).style.transform = `rotateY(${deg}deg)`;
  }, COIN_FLIP_DELAY);

  setTimeout(() => {
    coinContainer!.classList.remove("is-active");
    isFlipping = false;
    stopSound();
  }, COIN_ANIMATION_DURATION);
}

export function declareCoinResult(
  side: Side,
  currentPlayerSide: Side,
  roomState: Room
) {
  if (isFlipping || side === lastSide) return;

  setTimeout(() => {
    const name =
      currentPlayerSide === "left"
        ? roomState.players[1].name
        : roomState.players[0].name;

    const current = currentPlayerSide === side ? "current" : "other";

    triggerHelper({
      duration: COIN_RESULT_DURATION,
      text: helper(`helper.coinWinner.${current}`, { name }),
      type: HelperTypes.HELPER_INFORM,
      priority: 1,
      dedupeKey: `coin:${side}`,
      delayBeforeShow: 0,
    });
  }, COIN_ANIMATION_DURATION);
}

export function getRandomSide(): "left" | "right" {
  return Math.random() < 0.5 ? "left" : "right";
}

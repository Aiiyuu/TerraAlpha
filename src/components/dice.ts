import { createSound } from "./sound";
import diceSoundSrc from "../assets/sounds/dice.mp3";
import type { Room, Side } from "../types/room";
import { HelperTypes, triggerHelper } from "./helper";
import { helper, HEPER_WARNING_DURATION } from "../config";

const diceContainer = document.querySelector(".dice-container") as HTMLDivElement;

if (!diceContainer) {
  throw new Error("Dice container is not found.");
}

const ANIMATION_DURATION = 2000;
const ANIMATION_END_DELAY = 50;
export const HIDE_DICE_DELAY = ANIMATION_DURATION + 1000;

let isRolling = false;

const { startSound, stopSound } = createSound({
  src: diceSoundSrc,
  loudness: 0.6,
  infinite: true,
});

function findDiceButton(): HTMLButtonElement | null {
  return document.querySelector('[data-type="dice"]') as HTMLButtonElement | null;
}

export function setDiceRollingDisabled(disabled: boolean) {
  const btn = findDiceButton();
  if (!btn) return;
  btn.toggleAttribute("disabled", disabled);
  btn.classList.toggle("is-hidden", disabled);
}

window.addEventListener("coin:start", () => setDiceRollingDisabled(true));
window.addEventListener("coin:end", () => setDiceRollingDisabled(false));

export function throwDice(random: number) {
  if (isRolling) return;

  startSound();
  const dice = document.querySelector(".dice") as HTMLDivElement;

  diceContainer?.classList.add("dice-container--roling");
  dice.style.animation = `rolling ${ANIMATION_DURATION}ms linear`;
  isRolling = true;

  setTimeout(() => {
    switch (random) {
      case 1:
        dice.style.transform = "rotateX(0deg) rotateY(0deg)";
        break;
      case 6:
        dice.style.transform = "rotateX(180deg) rotateY(0deg)";
        break;
      case 2:
        dice.style.transform = "rotateX(-90deg) rotateY(0deg)";
        break;
      case 5:
        dice.style.transform = "rotateX(90deg) rotateY(0deg)";
        break;
      case 3:
        dice.style.transform = "rotateX(0deg) rotateY(90deg)";
        break;
      case 4:
        dice.style.transform = "rotateX(0deg) rotateY(-90deg)";
        break;
      default:
        break;
    }

    dice.style.animation = "none";
  }, ANIMATION_DURATION + ANIMATION_END_DELAY);

  setTimeout(() => {
    diceContainer?.classList.remove("dice-container--roling");
    isRolling = false;
    dice.style.transform = "none";
    stopSound();
  }, HIDE_DICE_DELAY);
}

export function setupDice() {
  const diceObject = `
		<div class="dice">
			<div class="face front"></div>
			<div class="face back"></div>
			<div class="face top"></div>
			<div class="face bottom"></div>
			<div class="face right"></div>
			<div class="face left"></div>
		</div>
  `;
  const temp = document.createElement("div");
  temp.innerHTML = diceObject;
  diceContainer!.appendChild(temp.firstElementChild!);
}

export function syncDiceHelper(
  roomState: Room,
  currentPlayerSide: Side,
  diceRes: number
) {
  setTimeout(() => {
    const current = currentPlayerSide === roomState?.isTurn ? "current" : "other";

    if (roomState.lastDiceResult === 6) {
      triggerHelper({
        duration: HEPER_WARNING_DURATION,
        text: helper(`helper.diceStreak.${current}`),
        type: HelperTypes.HELPER_HINT,
        priority: 2,
        dedupeKey: `dice:streak:${current}`,
        delayBeforeShow: 0,
      });
    } else {
      triggerHelper({
        duration: HEPER_WARNING_DURATION,
        text: helper(`helper.diceRes.${current}`, { res: diceRes }),
        type: HelperTypes.HELPER_HINT,
        priority: 2,
        dedupeKey: `dice:${diceRes}:${current}`,
        delayBeforeShow: 0,
      });
    }
  }, HIDE_DICE_DELAY);
}

const diceContainer = document.querySelector(
  ".dice-container"
) as HTMLDivElement;

if (!diceContainer) {
  throw new Error("Dice container is not found.");
}

const ANIMATION_DURATION = 4000;
const ANIMATION_END_DELAY = 50;
const HIDE_DICE_DELAY = ANIMATION_DURATION + 2000;

/**
 * This function generates a random value from 1 to 6 (including)
 * and fires the animation of the dice
 */
export function throwDice() {
  const dice = document.querySelector(".dice") as HTMLDivElement;

  const random = Math.floor(Math.random() * 6) + 1;
  diceContainer?.classList.add("dice-container--roling");

  dice.style.animation = `rolling ${ANIMATION_DURATION}ms ease`;

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
  }, HIDE_DICE_DELAY);
}

/**
 * This function is responsible for creating the 3D objects (dice)
 * and inserting them into the dice container.
 */
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

  // Create a temporary container to convert the string to DOM
  const temp = document.createElement("div");
  temp.innerHTML = diceObject;

  // Append the created DOM element to the container
  diceContainer!.appendChild(temp.firstElementChild!);
}

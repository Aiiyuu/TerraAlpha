const coinContainer = document.querySelector(".coin-container") as HTMLElement;
const coin = document.querySelector(".coin") as HTMLElement;

const COIN_FLIP_DELAY = 500;
export const COIN_ANIMATION_DURATION = 5000 + COIN_FLIP_DELAY;

export function flipCoin(side: "left" | "right") {
  coinContainer.classList.add("is-active");

  setTimeout(() => {
    const deg = side === "left" ? 3600 : 3780;
    coin.style.transform = `rotateX(${deg}deg)`;
  }, COIN_FLIP_DELAY);

  setTimeout(() => {
    coinContainer.classList.remove("is-active");
  }, COIN_ANIMATION_DURATION);
}

export function getRandomSide(): "left" | "right" {
  return Math.random() < 0.5 ? "left" : "right";
}

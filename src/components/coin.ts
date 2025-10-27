let coinContainer: HTMLElement | null = null;
let coin: HTMLElement | null = null;

const COIN_FLIP_DELAY = 500;
export const COIN_ANIMATION_DURATION = 5000 + COIN_FLIP_DELAY;

let isFlipping = false;
let lastSide: 'left' | 'right' | null = null;

function ensure(): boolean {
  if (!coinContainer) coinContainer = document.querySelector('.coin-container') as HTMLElement | null;
  if (!coin) coin = document.querySelector('.coin') as HTMLElement | null;
  return !!(coinContainer && coin);
}

export function initCoin(): void {
  ensure();
}

export function flipCoin(side: 'left' | 'right') {
  if (!ensure()) return;
  if (isFlipping || side === lastSide) return;

  isFlipping = true;
  lastSide = side;

  coinContainer!.classList.add('is-active');

  (coin as HTMLElement).style.transition = 'none';
  (coin as HTMLElement).style.transform = 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)';
  void (coin as any).offsetWidth;
  (coin as HTMLElement).style.transition = 'transform 5s ease';

  setTimeout(() => {
    const deg = side === 'left' ? 3600 : 3780;
    (coin as HTMLElement).style.transform = `rotateY(${deg}deg)`;
  }, COIN_FLIP_DELAY);

  setTimeout(() => {
    coinContainer!.classList.remove('is-active');
    isFlipping = false;
  }, COIN_ANIMATION_DURATION);
}

export function getRandomSide(): 'left' | 'right' {
  return Math.random() < 0.5 ? 'left' : 'right';
}

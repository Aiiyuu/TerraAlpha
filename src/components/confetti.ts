import confetti from "canvas-confetti";

const CONFETTI_INTERVAL = 500;
const CONFETTI_DEFAULTS = {
  startVelocity: 30,
  spread: 360,
  ticks: 60,
  zIndex: 10,
};
const CONFETTI_PARTICLE_COUNT = 50;

export function setupConfetti(): void {
  setInterval(() => {
    confetti({
      ...CONFETTI_DEFAULTS,
      particleCount: CONFETTI_PARTICLE_COUNT,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2,
      },
    });
  }, CONFETTI_INTERVAL);
}

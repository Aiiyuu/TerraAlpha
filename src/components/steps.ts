// === src/components/steps.ts ===
type PlayerColor = 'red' | 'blue';

let redBlock: HTMLElement | null = null;
let blueBlock: HTMLElement | null = null;

export function createSteps() {
  const redMoveBtn = document.querySelector('.player1.move-button') as HTMLElement | null;
  const blueMoveBtn = document.querySelector('.player2.move-button') as HTMLElement | null;

  if (!redMoveBtn || !blueMoveBtn) return;

  redBlock = document.createElement('div');
  redBlock.className = 'steps-block steps-red is-hidden';
  redBlock.setAttribute('data-qa', 'red-steps');

  blueBlock = document.createElement('div');
  blueBlock.className = 'steps-block steps-blue is-hidden';
  blueBlock.setAttribute('data-qa', 'blue-steps');

  // Червоний — зліва (перед кнопкою «Пoходити№1»)
  redMoveBtn.parentElement?.insertBefore(redBlock, redMoveBtn);
  // Синій — справа (після «Походити№2»)
  blueMoveBtn.parentElement?.insertBefore(blueBlock, blueMoveBtn.nextSibling);

  hideAllSteps();
}

export function hideAllSteps() {
  redBlock?.classList.add('is-hidden');
  blueBlock?.classList.add('is-hidden');
}

/**
 * Показати блок потрібного кольору і ЗІБРАТИ кнопки рівно в тому порядку,
 * як у масиві `values`. Дублікати зберігаються.
 */
export function showStepsSequence(color: PlayerColor, values: number[]) {
  if (!redBlock || !blueBlock) return;

  const target = color === 'red' ? redBlock : blueBlock;
  const other = color === 'red' ? blueBlock : redBlock;

  other.classList.add('is-hidden');
  target.classList.remove('is-hidden');

  // Перебудовуємо контент під поточну серію кидків
  target.innerHTML = '';

  values.forEach((v, idx) => {
    if (!Number.isFinite(v) || v < 1 || v > 6) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = String(v);
    btn.dataset.step = String(v);
    btn.dataset.index = String(idx);
    btn.className = `step-btn button is-${color === 'red' ? 'danger' : 'info'}`;

    // За потреби можна додати onClick на рух: btn.addEventListener('click', () => move(v));
    target.appendChild(btn);
  });
}

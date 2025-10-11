type PlayerColor = 'red' | 'blue';

let redBlock: HTMLElement | null = null;
let blueBlock: HTMLElement | null = null;

export function createSteps() {
  const redMoveBtn = document.querySelector('.player1.move-button') as HTMLElement | null;
  const blueMoveBtn = document.querySelector('.player2.move-button') as HTMLElement | null;

  if (!redMoveBtn || !blueMoveBtn) return;

  redBlock = createStepBlock('red');
  blueBlock = createStepBlock('blue');

  // червоний — ЗЛІВА від "Пoходити№1"
  redMoveBtn.parentElement?.insertBefore(redBlock, redMoveBtn);
  // синій — ПРАВОРУЧ від "Походити№2"
  blueMoveBtn.parentElement?.insertBefore(blueBlock, blueMoveBtn.nextSibling);

  hideAllSteps();
}

export function hideAllSteps() {
  redBlock?.classList.add('is-hidden');
  blueBlock?.classList.add('is-hidden');
}

export function showStepsForValues(color: PlayerColor, values: number[]) {
  if (!redBlock || !blueBlock) return;

  const allowed = new Set(values.filter(v => Number.isFinite(v) && v >= 1 && v <= 6));

  const target = color === 'red' ? redBlock : blueBlock;
  const other = color === 'red' ? blueBlock : redBlock;

  other.classList.add('is-hidden');  
  target.classList.remove('is-hidden'); 

  const allBtns = target.querySelectorAll<HTMLButtonElement>('.step-btn');
  allBtns.forEach(btn => {
    const step = Number(btn.dataset.step);
    if (allowed.has(step)) {
      btn.classList.remove('is-hidden');
      btn.disabled = false;
    } else {
      btn.classList.add('is-hidden');
      btn.disabled = true;
    }
  });
}

function createStepBlock(color: PlayerColor) {
  const block = document.createElement('div');
  block.className = `steps-block steps-${color} is-hidden`;
  block.setAttribute('data-qa', `${color}-steps`);

  for (let i = 1; i <= 6; i += 1) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = String(i);
    btn.dataset.step = String(i);
    btn.className = `step-btn button is-${color === 'red' ? 'danger' : 'info'}`;
    btn.setAttribute('data-qa', `${color}-step-${i}`);

    block.appendChild(btn);
  }

  return block;
}

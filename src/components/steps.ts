// === steps.ts ===

export function createSteps() {

  const redMoveBtn = document.querySelector('.player1.move-button') as HTMLElement;
  const blueMoveBtn = document.querySelector('.player2.move-button') as HTMLElement;

  if (!redMoveBtn || !blueMoveBtn) return;


  const redBlock = createStepBlock('red');
  const blueBlock = createStepBlock('blue');


  redMoveBtn.parentElement?.insertBefore(redBlock, redMoveBtn); // зліва
  blueMoveBtn.parentElement?.appendChild(blueBlock); // справа
}

function createStepBlock(color: 'red' | 'blue') {
  const block = document.createElement('div');
  block.classList.add('steps-block', `steps-${color}`);


  for (let i = 1; i <= 6; i++) {
    const btn = document.createElement('button');
    btn.textContent = `${i}`;
    btn.classList.add('step-btn', `is-${color}`, 'button');
    block.appendChild(btn);
  }

  return block;
}

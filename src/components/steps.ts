type PlayerColor = 'red' | 'blue';

let redBlock: HTMLDivElement | null = null;
let blueBlock: HTMLDivElement | null = null;

/* ---------------- Helpers ---------------- */

const $ = <T extends Element = Element>(sel: string) =>
  document.querySelector<T>(sel);

const toneByColor = (c: PlayerColor) => (c === 'red' ? 'is-danger' : 'is-info');

function setWhite(btn: HTMLButtonElement) {
  btn.className = 'button step-btn is-white';
  btn.disabled = false;
}
function setActive(btn: HTMLButtonElement, tone: 'is-danger' | 'is-info') {
  btn.className = `button step-btn ${tone} is-active`;
  btn.disabled = false;
}
function setCombined(btn: HTMLButtonElement, tone: 'is-danger' | 'is-info') {
  btn.className = `button step-btn ${tone} is-dark is-combined`;
  btn.disabled = false;
}
function setDisabled(btn: HTMLButtonElement) {

  btn.disabled = true;
}


export function setStepsEnabled(color: PlayerColor, enabled: boolean) {
  const block = color === 'red' ? redBlock : blueBlock;
  if (!block) return;
  block.querySelectorAll<HTMLButtonElement>('.step-btn').forEach((b) => {
    b.disabled = !enabled;
  });
}

/* ---------------- Mount / Resolve ---------------- */

function resolveMoveButtons() {
  let redMoveBtn = $<HTMLElement>('.player1 .move-button');
  let blueMoveBtn = $<HTMLElement>('.player2 .move-button');

  if (!redMoveBtn || !blueMoveBtn) {
    const all = Array.from(document.querySelectorAll<HTMLElement>('.move-button'));
    if (all.length >= 2) {
      redMoveBtn = all[0];
      blueMoveBtn = all[1];
    }
  }
  if (!redMoveBtn) redMoveBtn = $<HTMLElement>('#move1, [data-move="p1"]');
  if (!blueMoveBtn) blueMoveBtn = $<HTMLElement>('#move2, [data-move="p2"]');

  return { redMoveBtn, blueMoveBtn };
}

function mountBlocks(redMoveBtn: HTMLElement, blueMoveBtn: HTMLElement) {
  if (!redBlock) {
    redBlock = document.createElement('div');
    redBlock.className = 'steps-block steps-red is-hidden';
    redMoveBtn.insertAdjacentElement('beforebegin', redBlock);
  }
  if (!blueBlock) {
    blueBlock = document.createElement('div');
    blueBlock.className = 'steps-block steps-blue is-hidden';
    blueMoveBtn.insertAdjacentElement('afterend', blueBlock);
  }
}

const getBlock = (color: PlayerColor) => (color === 'red' ? redBlock! : blueBlock!);

/* ---------------- Render / Reset ---------------- */

function renderButtons(block: HTMLDivElement, values: number[], color: PlayerColor) {
  block.innerHTML = '';
  block.dataset.merged = 'false';
  block.dataset.original = JSON.stringify(values);
  block.classList.remove('is-hidden');

  const tone = toneByColor(color);

  values.forEach((v, idx) => {
    if (!Number.isFinite(v)) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = String(v);
    btn.dataset.step = String(v);
    btn.dataset.index = String(idx);
    btn.dataset.tone = tone;

    setWhite(btn); 
    block.appendChild(btn);
  });
}

function resetToOriginal(block: HTMLDivElement, color: PlayerColor) {
  const original = JSON.parse(block.dataset.original || '[]') as number[];
  renderButtons(block, original, color);
}

/* ---------------- Interaction ---------------- */

function attachInteraction(block: HTMLDivElement, _color: PlayerColor) {
  const getNum = (el: HTMLButtonElement) => Number(el.dataset.step || el.textContent || 0);

  block.onclick = (e) => {
    const target = (e.target as HTMLElement)?.closest<HTMLButtonElement>('.step-btn');
    if (!target || !block.contains(target) || target.disabled) return;

    const merged = block.dataset.merged === 'true';
    const tone = (target.dataset.tone as 'is-danger' | 'is-info') || 'is-info';

    if (!merged) {
      const active = block.querySelector<HTMLButtonElement>('.step-btn.is-active');


      if (!active) {
        setActive(target, tone);
        return;
      }


      if (active === target) {
        setWhite(active);
        return;
      }

      const sum = getNum(active) + getNum(target);

 
      target.textContent = String(sum);
      target.dataset.step = String(sum);
      setCombined(target, tone);


      setDisabled(active);

      block.dataset.merged = 'true';
      return;
    }


    const combined = block.querySelector<HTMLButtonElement>('.step-btn.is-combined');
    if (!combined) {
      resetToOriginal(block, _color);
      return;
    }

    if (target === combined) {
      resetToOriginal(block, _color);
      return;
    }

    const newSum = getNum(combined) + getNum(target);
    combined.textContent = String(newSum);
    combined.dataset.step = String(newSum);

    setDisabled(target);
  };
}

/* ---------------- Public API ---------------- */

export function createSteps() {
  const { redMoveBtn, blueMoveBtn } = resolveMoveButtons();
  if (!redMoveBtn || !blueMoveBtn) {
    requestAnimationFrame(createSteps);
    return;
  }

  mountBlocks(redMoveBtn, blueMoveBtn);
  attachInteraction(redBlock!, 'red');
  attachInteraction(blueBlock!, 'blue');
  hideAllSteps();
}

export function hideAllSteps() {
  redBlock?.classList.add('is-hidden');
  blueBlock?.classList.add('is-hidden');
}

export function showStepsSequence(color: PlayerColor, values: number[]) {
  if (!redBlock || !blueBlock) createSteps();
  if (!redBlock || !blueBlock) return;

  const target = getBlock(color);
  const other = color === 'red' ? blueBlock : redBlock;

  other.classList.add('is-hidden');
  renderButtons(target, values, color);
}

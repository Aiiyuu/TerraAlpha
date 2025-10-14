// steps.ts

type PlayerColor = 'red' | 'blue';

let redBlock: HTMLDivElement | null = null;
let blueBlock: HTMLDivElement | null = null;
let activeColor: PlayerColor | null = null;

const activePlanned: Partial<Record<PlayerColor, number | null>> = {
  red: null,
  blue: null,
};

const $ = <T extends Element = Element>(
  sel: string,
  root: ParentNode | Document = document,
) => root.querySelector<T>(sel);

const $$ = <T extends Element = Element>(
  sel: string,
  root: ParentNode | Document = document,
) => Array.from(root.querySelectorAll<T>(sel));

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

function emitPlannedChange(color: PlayerColor, planned: number | null) {
  document.dispatchEvent(
    new CustomEvent('steps:planned-change', { detail: { color, planned } }),
  );
}

function setRemainingIndices(block: HTMLDivElement, indices: number[]) {
  block.dataset.remainingIndices = JSON.stringify(indices);
}

function getRemainingIndices(block: HTMLDivElement): number[] {
  try {
    return JSON.parse(block.dataset.remainingIndices || '[]') as number[];
  } catch {
    return [];
  }
}

function setPlanned(block: HTMLDivElement, value: number | null) {
  if (value === null) {
    delete block.dataset.planned;
    delete block.dataset.plannedIndex;
  } else {
    block.dataset.planned = String(value);
  }
}

export function getPlannedMove(color: PlayerColor): number | null {
  const block = color === 'red' ? redBlock : blueBlock;
  if (!block) return null;
  return block.dataset.planned ? Number(block.dataset.planned) : null;
}

export function consumePlannedMove(color: PlayerColor): number | null {
  const block = color === 'red' ? redBlock : blueBlock;
  if (!block) return null;
  const val = block.dataset.planned ? Number(block.dataset.planned) : null;
  setPlanned(block, null);
  emitPlannedChange(color, null);
  activePlanned[color] = null;
  return val;
}

export function getRemainingValues(color: PlayerColor): number[] {
  const block = color === 'red' ? redBlock : blueBlock;
  if (!block) return [];
  const original = JSON.parse(block.dataset.original || '[]') as number[];
  const remainingIdx = getRemainingIndices(block);
  return remainingIdx.map(i => original[i]).filter(v => Number.isFinite(v));
}

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

function getMoveBtn(color: PlayerColor) {
  const { redMoveBtn, blueMoveBtn } = resolveMoveButtons();
  return color === 'red' ? redMoveBtn : blueMoveBtn;
}

function setMoveBtnInteractivity(color: PlayerColor, enabled: boolean) {
  const el = getMoveBtn(color);
  if (!el) return;

  if (el instanceof HTMLButtonElement) {
    el.disabled = !enabled;
  } else {
    el.classList.toggle('is-disabled', !enabled);
    el.setAttribute('aria-disabled', String(!enabled));
    if (!enabled) {
      (el as HTMLElement).style.pointerEvents = 'none';
      (el as HTMLElement).setAttribute('tabindex', '-1');
      el.setAttribute('data-locked', 'true');
    } else {
      (el as HTMLElement).style.pointerEvents = '';
      (el as HTMLElement).removeAttribute('tabindex');
      el.removeAttribute('data-locked');
    }
  }
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

const lastPickedByColor: Partial<Record<PlayerColor, HTMLButtonElement>> = {};

function colorOfShipBtn(btn: HTMLButtonElement): PlayerColor | null {
  const qa = btn.getAttribute('data-qa') || '';
  if (qa.startsWith('p1-cell-')) return 'red';
  if (qa.startsWith('p2-cell-')) return 'blue';
  if (btn.closest('#player1, .player1')) return 'red';
  if (btn.closest('#player2, .player2')) return 'blue';
  return null;
}

function markPicked(btn: HTMLButtonElement | null, color: PlayerColor) {
  const prev = lastPickedByColor[color];
  if (prev && prev !== btn) prev.classList.remove('is-picked');
  if (btn) {
    btn.classList.add('is-picked');
    lastPickedByColor[color] = btn;
  }
}

function getPickedShipBtnForColor(color: PlayerColor): HTMLButtonElement | null {
  const explicit = $<HTMLButtonElement>('.cell-btn.is-picked');
  if (explicit && colorOfShipBtn(explicit) === color) return explicit;
  if (lastPickedByColor[color]) return lastPickedByColor[color]!;
  const any = $<HTMLButtonElement>(
    `.cell-btn[data-qa^="${color === 'red' ? 'p1-cell-' : 'p2-cell-'}"]`,
  );
  return any || null;
}

document.addEventListener('click', e => {
  const btn = (e.target as HTMLElement).closest('.cell-btn') as HTMLButtonElement | null;
  if (!btn) return;
  const color = colorOfShipBtn(btn);
  if (!color) return;
  markPicked(btn, color);
});

function clearForecastHighlights() {
  $$('.board .cell.is-forecast').forEach(c => c.classList.remove('is-forecast'));
}

function getSingleForecastCell(): HTMLElement | null {
  const list = $$('.board .cell.is-forecast');
  return list.length === 1 ? (list[0] as HTMLElement) : null;
}

function moveShipButtonToCell(shipBtn: HTMLButtonElement, cell: HTMLElement) {
  const existing = cell.querySelector<HTMLButtonElement>('.cell-btn');
  if (existing && existing !== shipBtn) return;
  shipBtn.classList.remove('is-picked');
  shipBtn.style.margin = '0';
  cell.appendChild(shipBtn);
}

function finishStepFor(color: PlayerColor) {
  clearForecastHighlights();
  const block = getBlock(color);
  const rest = getRemainingValues(color);

  activePlanned[color] = null;
  setPlanned(block, null);
  emitPlannedChange(color, null);

  if (rest.length > 0) {
    renderButtons(block, rest, color);
    block.classList.remove('is-hidden');
    setMoveBtnInteractivity(color, false);
  } else {
    block.classList.add('is-hidden');
    setMoveBtnInteractivity(color, true);
  }
}

export function setStepsEnabled(color: PlayerColor, enabled: boolean) {
  const block = color === 'red' ? redBlock : blueBlock;
  if (!block) return;
  block.querySelectorAll<HTMLButtonElement>('.step-btn').forEach(btn => {
    btn.disabled = !enabled;
  });
}

function renderButtons(block: HTMLDivElement, values: number[], color: PlayerColor) {
  block.innerHTML = '';
  block.dataset.merged = 'false';
  block.dataset.original = JSON.stringify(values);
  setRemainingIndices(block, values.map((_, i) => i));
  setPlanned(block, null);
  emitPlannedChange(color, null);
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

function attachInteraction(block: HTMLDivElement, color: PlayerColor) {
  const getNum = (el: HTMLButtonElement) => Number(el.dataset.step || el.textContent || 0);

  block.onclick = e => {
    const target = (e.target as HTMLElement)?.closest<HTMLButtonElement>('.step-btn');
    if (!target || !block.contains(target) || target.disabled) return;

    const merged = block.dataset.merged === 'true';
    const tone = (target.dataset.tone as 'is-danger' | 'is-info') || 'is-info';

    const restoreRemainingToOriginal = () => {
      const original = JSON.parse(block.dataset.original || '[]') as number[];
      setRemainingIndices(block, original.map((_, i) => i));
    };

    const removeIndices = (toRemove: number[]) => {
      const rem = getRemainingIndices(block);
      setRemainingIndices(
        block,
        rem.filter(i => !toRemove.includes(i)),
      );
    };

    const setPlannedWithIndex = (val: number | null, idxs?: number[]) => {
      setPlanned(block, val);
      activePlanned[color] = val;
      if (!idxs || idxs.length === 0) delete block.dataset.plannedIndices;
      else block.dataset.plannedIndices = JSON.stringify(idxs);
      emitPlannedChange(color, val);
    };

    if (!merged) {
      const active = block.querySelector<HTMLButtonElement>('.step-btn.is-active');

      if (!active) {
        setActive(target, tone);
        const idx = Number(target.dataset.index);
        const val = getNum(target);
        setPlannedWithIndex(val, [idx]);
        removeIndices([idx]); 
        return;
      }

      if (active === target) {
        setWhite(active);
        setPlannedWithIndex(null, []);
        restoreRemainingToOriginal();
        return;
      }

      const sum = getNum(active) + getNum(target);
      const activeIdx = Number(active.dataset.index);
      const targetIdx = Number(target.dataset.index);

      target.textContent = String(sum);
      target.dataset.step = String(sum);
      target.dataset.components = JSON.stringify([activeIdx, targetIdx]);

      setCombined(target, tone);
      setDisabled(active);
      block.dataset.merged = 'true';

      setPlannedWithIndex(sum, [activeIdx, targetIdx]);
      removeIndices([activeIdx, targetIdx]); 
      return;
    }

    const combined = block.querySelector<HTMLButtonElement>('.step-btn.is-combined');

    if (!combined) {
      resetToOriginal(block, color);
      return;
    }

    if (target === combined) {
      resetToOriginal(block, color);
      setPlanned(block, null);
      activePlanned[color] = null;
      emitPlannedChange(color, null);
      return;
    }

    const newSum = getNum(combined) + getNum(target);
    combined.textContent = String(newSum);
    combined.dataset.step = String(newSum);

    const prevComponents = (() => {
      try {
        return JSON.parse(combined.dataset.components || '[]') as number[];
      } catch {
        return [];
      }
    })();

    const newTargetIdx = Number(target.dataset.index);
    const updatedComponents = [...prevComponents, newTargetIdx];
    combined.dataset.components = JSON.stringify(updatedComponents);

    setDisabled(target);

    removeIndices([newTargetIdx]);

    setPlanned(block, newSum);
    activePlanned[color] = newSum;
    block.dataset.plannedIndices = JSON.stringify(updatedComponents);
    emitPlannedChange(color, newSum);
  };
}

function requestForecast(
  color: PlayerColor,
  shipBtn: HTMLButtonElement,
  planned: number,
) {
  const shipQa = shipBtn.getAttribute('data-qa') || '';
  const parentCell = shipBtn.closest<HTMLElement>('.board .cell');
  const fromCellQa = parentCell?.getAttribute('data-qa') || null;

  document.dispatchEvent(
    new CustomEvent('steps:request-forecast', {
      detail: { color, planned, shipQa, fromCellQa },
    }),
  );
}

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

  document.addEventListener(
    'pointerenter',
    e => handleShipPointer(e as PointerEvent, 'enter'),
    true,
  );
  document.addEventListener(
    'pointerleave',
    e => handleShipPointer(e as PointerEvent, 'leave'),
    true,
  );
  document.addEventListener(
    'click',
    e => handleShipPointer(e as unknown as PointerEvent, 'click'),
    true,
  );

  document.addEventListener(
    'click',
    e => {
      if (!activeColor) return;
      const btn = (e.target as HTMLElement)?.closest('.move-button');
      if (!btn) return;

      const lock =
        btn.getAttribute('aria-disabled') === 'true' ||
        btn.getAttribute('data-locked') === 'true' ||
        (btn as HTMLElement).style.pointerEvents === 'none';

      const isActiveBtn = btn === getMoveBtn(activeColor);
      if (isActiveBtn && lock) {
        e.stopImmediatePropagation?.();
        e.preventDefault();
      }
    },
    true,
  );

  document.addEventListener(
    'keydown',
    e => {
      if (!activeColor) return;
      const btn = getMoveBtn(activeColor);
      if (!btn) return;

      const locked =
        btn.getAttribute('aria-disabled') === 'true' ||
        btn.getAttribute('data-locked') === 'true' ||
        (btn as HTMLElement).style.pointerEvents === 'none' ||
        (btn instanceof HTMLButtonElement && btn.disabled);

      if (!locked) return;

      if (e.key === 'Enter' || e.key === ' ') {
        const targetEl = e.target as HTMLElement;
        if (targetEl && targetEl.closest('.move-button') === btn) {
          e.stopImmediatePropagation?.();
          e.preventDefault();
        }
      }
    },
    true,
  );
}

export function hideAllSteps() {
  redBlock?.classList.add('is-hidden');
  blueBlock?.classList.add('is-hidden');
}

export function showStepsSequence(color: PlayerColor, values: number[]) {
  if (!redBlock || !blueBlock) {
    createSteps();
    requestAnimationFrame(() => showStepsSequence(color, values));
    return;
  }

  activeColor = color;
  activePlanned[color] = null;

  const target = getBlock(color);
  const other = color === 'red' ? blueBlock : redBlock;

  other.classList.add('is-hidden');
  renderButtons(target, values, color);
  setMoveBtnInteractivity(color, false);
}

export function getRemainingForColor(color: PlayerColor): number[] {
  return getRemainingValues(color);
}

export function clearPlanned(color: PlayerColor) {
  const block = color === 'red' ? redBlock : blueBlock;
  if (!block) return;

  setPlanned(block, null);
  activePlanned[color] = null;

  const original = JSON.parse(block.dataset.original || '[]') as number[];
  setRemainingIndices(block, original.map((_, i) => i));
  emitPlannedChange(color, null);
}

export function commitPlannedMove(color: PlayerColor): boolean {
  const ship = getPickedShipBtnForColor(color);
  const cell = getSingleForecastCell();
  if (!ship || !cell) return false;

  moveShipButtonToCell(ship, cell);
  finishStepFor(color);
  return true;
}

function handleShipPointer(e: PointerEvent, type: 'enter' | 'leave' | 'click') {
  if (!activeColor) return;

  const colorNow = activeColor as PlayerColor;
  const btn = (e.target as HTMLElement)?.closest<HTMLButtonElement>('.cell-btn');
  if (!btn) return;

  const btnColor = colorOfShipBtn(btn);
  if (!btnColor || btnColor !== colorNow) return;

  const planned = activePlanned[colorNow];
  if (!Number.isFinite(planned)) return;

  if (type === 'enter') {
    requestForecast(colorNow, btn, planned as number);
    return;
  }

  if (type === 'leave') {
    return;
  }

  if (type === 'click') {
    let cell = getSingleForecastCell();
    if (cell) {
      moveShipButtonToCell(btn, cell);
      finishStepFor(colorNow);
      return;
    }

    const parentCell = btn.closest<HTMLElement>('.board .cell');
    const fromQa = parentCell?.getAttribute('data-qa') || null;

    let targetNum: number | null = null;

    if (fromQa) {
      const m = fromQa.match(/^field-(\d+)$/);
      const from = m ? Number(m[1]) : NaN;
      if (Number.isFinite(from)) targetNum = from + (planned as number);
    } else {
      targetNum = planned as number;
    }

    if (Number.isFinite(targetNum as number)) {
      cell = document.querySelector<HTMLElement>(`.board [data-qa="field-${targetNum}"]`);
      if (cell) {
        moveShipButtonToCell(btn, cell);
        finishStepFor(colorNow);
        return;
      }
    }

    requestForecast(colorNow, btn, planned as number);
    requestAnimationFrame(() => {
      const retryCell = getSingleForecastCell();
      if (retryCell) {
        moveShipButtonToCell(btn, retryCell);
        finishStepFor(colorNow);
      }
    });
  }
}

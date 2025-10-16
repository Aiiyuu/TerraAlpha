type PlayerColor = 'red' | 'blue';

let redBlock: HTMLDivElement | null = null;
let blueBlock: HTMLDivElement | null = null;
let activeColor: PlayerColor | null = null;

const activePlanned: Partial<Record<PlayerColor, number | null>> = { red: null, blue: null };

const $ = <T extends Element = Element>(sel: string, root: ParentNode | Document = document) =>
  root.querySelector<T>(sel);
const $$ = <T extends Element = Element>(sel: string, root: ParentNode | Document = document) =>
  Array.from(root.querySelectorAll<T>(sel));

const toneByColor = (c: PlayerColor) => (c === 'red' ? 'is-danger' : 'is-info');

function setWhite(btn: HTMLButtonElement) {
  btn.className = 'button step-btn is-white';
  btn.disabled = false;
}
function setActive(btn: HTMLButtonElement, tone: 'is-danger' | 'is-info') {
  btn.className = `button step-btn ${tone} is-active`;
  btn.disabled = false;
}
function setInactiveLook(btn: HTMLButtonElement, tone: 'is-danger' | 'is-info') {
  btn.className = `button step-btn ${tone} is-light is-inactive`;
  btn.disabled = false;
}

function emitPlannedChange(color: PlayerColor, planned: number | null) {
  document.dispatchEvent(new CustomEvent('steps:planned-change', { detail: { color, planned } }));
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
  const btn = getMoveBtn(color);
  if (!btn) return;
  if (btn instanceof HTMLButtonElement) {
    btn.disabled = !enabled;
  } else {
    btn.classList.toggle('is-disabled', !enabled);
    btn.setAttribute('aria-disabled', String(!enabled));
    if (!enabled) {
      (btn as HTMLElement).style.pointerEvents = 'none';
      (btn as HTMLElement).setAttribute('tabindex', '-1');
      btn.setAttribute('data-locked', 'true');
    } else {
      (btn as HTMLElement).style.pointerEvents = '';
      (btn as HTMLElement).removeAttribute('tabindex');
      btn.removeAttribute('data-locked');
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
function bindOnce(block: HTMLDivElement, color: PlayerColor) {
  if (block.dataset.bound === '1') return;
  attachInteraction(block, color);
  block.dataset.bound = '1';
}

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
function requestForecast(color: PlayerColor, shipBtn: HTMLButtonElement, planned: number) {
  const shipQa = shipBtn.getAttribute('data-qa') || '';
  const parentCell = shipBtn.closest<HTMLElement>('.board .cell');
  const fromCellQa = parentCell?.getAttribute('data-qa') || null;
  document.dispatchEvent(
    new CustomEvent('steps:request-forecast', {
      detail: { color, planned, shipQa, fromCellQa },
    }),
  );
}

function setDataset(block: HTMLDivElement, key: string, val: unknown) {
  if (val === null || val === undefined) delete (block.dataset as any)[key];
  else (block.dataset as any)[key] = typeof val === 'string' ? val : JSON.stringify(val);
}
function readJson<T>(s: string | undefined, fallback: T): T {
  try {
    return s ? (JSON.parse(s) as T) : fallback;
  } catch {
    return fallback;
  }
}
function getOriginal(block: HTMLDivElement): number[] {
  return readJson<number[]>(block.dataset.original, []);
}
function getPickedIndices(block: HTMLDivElement): number[] {
  return readJson<number[]>(block.dataset.pickedIndices, []);
}
function setPickedIndices(block: HTMLDivElement, idxs: number[]) {
  setDataset(block, 'pickedIndices', idxs);
}
function getStateMode(block: HTMLDivElement): 'base' | 'sum' {
  const v = block.dataset.mode;
  return v === 'sum' ? 'sum' : 'base';
}
function setStateMode(block: HTMLDivElement, mode: 'base' | 'sum') {
  block.dataset.mode = mode;
}
function setActiveValue(block: HTMLDivElement, val: number | null) {
  if (val === null) delete block.dataset.active;
  else block.dataset.active = String(val);
}
function getActiveValue(block: HTMLDivElement): number | null {
  const v = block.dataset.active;
  return typeof v === 'string' ? Number(v) : null;
}

function renderBase(block: HTMLDivElement, values: number[], color: PlayerColor, picked: number | null) {
  block.innerHTML = '';
  setStateMode(block, 'base');
  const tone = toneByColor(color);
  values.forEach((v, idx) => {
    if (!Number.isFinite(v)) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = String(v);
    btn.dataset.index = String(idx);
    btn.dataset.step = String(v);
    btn.dataset.tone = tone;
    if (picked !== null && idx === picked) setActive(btn, tone);
    else setWhite(btn);
    block.appendChild(btn);
  });
}
function renderSum(block: HTMLDivElement, sum: number, leftovers: Array<{ idx: number; val: number }>, color: PlayerColor) {
  block.innerHTML = '';
  setStateMode(block, 'sum');
  const tone = toneByColor(color);
  const sumBtn = document.createElement('button');
  sumBtn.type = 'button';
  sumBtn.textContent = String(sum);
  sumBtn.dataset.role = 'sum';
  sumBtn.dataset.step = String(sum);
  sumBtn.dataset.tone = tone;
  setActive(sumBtn, tone);
  block.appendChild(sumBtn);
  leftovers.forEach(({ idx, val }) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = String(val);
    btn.dataset.index = String(idx);
    btn.dataset.step = String(val);
    btn.dataset.tone = tone;
    setInactiveLook(btn, tone);
    block.appendChild(btn);
  });
}

function applyMoveBtnState(color: PlayerColor) {
  const block = color === 'red' ? redBlock! : blueBlock!;
  const leftovers = getOriginal(block);
  setMoveBtnInteractivity(color, leftovers.length === 0);
  const active = getActiveValue(block);
  activePlanned[color] = Number.isFinite(active as number) ? (active as number) : null;
  emitPlannedChange(color, activePlanned[color] ?? null);
}

function handleBaseClick(block: HTMLDivElement, color: PlayerColor, target: HTMLButtonElement) {
  const idx = Number(target.dataset.index);
  const original = getOriginal(block);
  const activeIdx = getPickedIndices(block)[0] ?? null;
  if (activeIdx === null) {
    setPickedIndices(block, [idx]);
    setActiveValue(block, Number(target.dataset.step || 0));
    renderBase(block, original, color, idx);
    applyMoveBtnState(color);
    return;
  }
  if (activeIdx === idx) {
    setPickedIndices(block, []);
    setActiveValue(block, null);
    renderBase(block, original, color, null);
    applyMoveBtnState(color);
    return;
  }
  const firstVal = original[activeIdx] ?? 0;
  const secondVal = original[idx] ?? 0;
  const sum = firstVal + secondVal;
  const picked = [activeIdx, idx].sort((a, b) => a - b);
  setPickedIndices(block, picked);
  setActiveValue(block, sum);
  const leftovers = original.map((v, i) => ({ idx: i, val: v })).filter(x => !picked.includes(x.idx));
  renderSum(block, sum, leftovers, color);
  applyMoveBtnState(color);
}

function handleSumClick(block: HTMLDivElement, color: PlayerColor, target: HTMLButtonElement) {
  const role = target.dataset.role;
  const original = getOriginal(block);
  if (role === 'sum') {
    setPickedIndices(block, []);
    setActiveValue(block, null);
    renderBase(block, original, color, null);
    applyMoveBtnState(color);
    return;
  }
  const idx = Number(target.dataset.index);
  const val = Number(target.dataset.step || 0);
  const current = getActiveValue(block) || 0;
  const sum = current + val;
  const picked = [...getPickedIndices(block), idx].sort((a, b) => a - b);
  setPickedIndices(block, picked);
  setActiveValue(block, sum);
  const leftovers = original.map((v, i) => ({ idx: i, val: v })).filter(x => !picked.includes(x.idx));
  renderSum(block, sum, leftovers, color);
  applyMoveBtnState(color);
}

function attachInteraction(block: HTMLDivElement, color: PlayerColor) {
  block.onclick = e => {
    const target = (e.target as HTMLElement)?.closest<HTMLButtonElement>('.button');
    if (!target || !block.contains(target)) return;
    const mode = getStateMode(block);
    if (mode === 'base') handleBaseClick(block, color, target);
    else handleSumClick(block, color, target);
  };
}

function renderInit(block: HTMLDivElement, values: number[], color: PlayerColor) {
  block.dataset.original = JSON.stringify(values);
  setPickedIndices(block, []);
  setActiveValue(block, null);
  renderBase(block, values, color, null);
  block.classList.remove('is-hidden');
  applyMoveBtnState(color);
}

export function getPlannedMove(color: PlayerColor): number | null {
  const block = color === 'red' ? redBlock : blueBlock;
  if (!block) return null;
  const v = getActiveValue(block);
  return Number.isFinite(v as number) ? (v as number) : null;
}

export function consumePlannedMove(color: PlayerColor): number | null {
  const block = color === 'red' ? redBlock : blueBlock;
  if (!block) return null;
  const val = getActiveValue(block);
  setActiveValue(block, null);
  setPickedIndices(block, []);
  applyMoveBtnState(color);
  return Number.isFinite(val as number) ? (val as number) : null;
}

export function getRemainingValues(color: PlayerColor): number[] {
  const block = color === 'red' ? redBlock : blueBlock;
  if (!block) return [];
  const original = getOriginal(block);
  const picked = new Set(getPickedIndices(block));
  return original.filter((_, i) => !picked.has(i));
}

export function hideAllSteps() {
  redBlock?.classList.add('is-hidden');
  blueBlock?.classList.add('is-hidden');
}

export function setStepsEnabled(color: PlayerColor, enabled: boolean) {
  const block = color === 'red' ? redBlock : blueBlock;
  if (!block) return;
  block.querySelectorAll<HTMLButtonElement>('.button').forEach(btn => {
    if (btn.dataset.role === 'sum') return;
    btn.disabled = !enabled;
    if (!enabled) setInactiveLook(btn, (btn.dataset.tone as any) || 'is-info');
  });
}

export function showStepsSequence(color: PlayerColor, values: number[]) {
  const { redMoveBtn, blueMoveBtn } = resolveMoveButtons();
  if (!redMoveBtn || !blueMoveBtn) {
    requestAnimationFrame(() => showStepsSequence(color, values));
    return;
  }
  mountBlocks(redMoveBtn, blueMoveBtn);
  bindOnce(redBlock!, 'red');
  bindOnce(blueBlock!, 'blue');
  activeColor = color;
  const target = color === 'red' ? redBlock! : blueBlock!;
  const other = color === 'red' ? blueBlock! : redBlock!;
  other.classList.add('is-hidden');
  renderInit(target, [...values], color);
  setMoveBtnInteractivity(color, false);
}

export function clearPlanned(color: PlayerColor) {
  const block = color === 'red' ? redBlock : blueBlock;
  if (!block) return;
  const original = getOriginal(block);
  setPickedIndices(block, []);
  setActiveValue(block, null);
  renderBase(block, original, color, null);
  applyMoveBtnState(color);
}

export function getRemainingForColor(color: PlayerColor): number[] {
  return getRemainingValues(color);
}

function spendUsedIndices(block: HTMLDivElement) {
  const original = getOriginal(block);
  const used = new Set(getPickedIndices(block));
  const leftovers = original.filter((_, i) => !used.has(i));
  block.dataset.original = JSON.stringify(leftovers);
  setPickedIndices(block, []);
  setActiveValue(block, null);
  return leftovers;
}

function finishStepFor(color: PlayerColor) {
  clearForecastHighlights();
  const block = color === 'red' ? redBlock! : blueBlock!;
  const leftovers = spendUsedIndices(block);
  if (leftovers.length > 0) {
    renderBase(block, leftovers, color, null);
    block.classList.remove('is-hidden');
    setMoveBtnInteractivity(color, false);
    activePlanned[color] = null;
    emitPlannedChange(color, null);
    return;
  }
  block.classList.add('is-hidden');
  setMoveBtnInteractivity(color, true);
  activePlanned[color] = null;
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
  if (type === 'leave') return;
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

export function createSteps() {
  const { redMoveBtn, blueMoveBtn } = resolveMoveButtons();
  if (!redMoveBtn || !blueMoveBtn) {
    requestAnimationFrame(createSteps);
    return;
  }
  mountBlocks(redMoveBtn, blueMoveBtn);
  bindOnce(redBlock!, 'red');
  bindOnce(blueBlock!, 'blue');
  hideAllSteps();
  document.addEventListener('pointerenter', e => handleShipPointer(e as PointerEvent, 'enter'), true);
  document.addEventListener('pointerleave', e => handleShipPointer(e as PointerEvent, 'leave'), true);
  document.addEventListener('click', e => handleShipPointer(e as unknown as PointerEvent, 'click'), true);
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

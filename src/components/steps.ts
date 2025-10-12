type PlayerColor = 'red' | 'blue';

let redBlock: HTMLDivElement | null = null;
let blueBlock: HTMLDivElement | null = null;

const $ = <T extends Element = Element>(sel: string) => document.querySelector<T>(sel);
const toneByColor = (c: PlayerColor) => (c === 'red' ? 'is-danger' : 'is-info');

function setWhite(btn: HTMLButtonElement) { btn.className = 'button step-btn is-white'; btn.disabled = false; }
function setActive(btn: HTMLButtonElement, tone: 'is-danger' | 'is-info') { btn.className = `button step-btn ${tone} is-active`; btn.disabled = false; }
function setCombined(btn: HTMLButtonElement, tone: 'is-danger' | 'is-info') { btn.className = `button step-btn ${tone} is-dark is-combined`; btn.disabled = false; }
function setDisabled(btn: HTMLButtonElement) { btn.disabled = true; }

function emitPlannedChange(color: PlayerColor, planned: number | null) {
  document.dispatchEvent(new CustomEvent('steps:planned-change', { detail: { color, planned } }));
}

function setRemainingIndices(block: HTMLDivElement, indices: number[]) {
  block.dataset.remainingIndices = JSON.stringify(indices);
}
function getRemainingIndices(block: HTMLDivElement): number[] {
  try { return JSON.parse(block.dataset.remainingIndices || '[]') as number[]; } catch { return []; }
}
function setPlanned(block: HTMLDivElement, value: number | null) {
  if (value === null) { delete block.dataset.planned; delete block.dataset.plannedIndex; }
  else { block.dataset.planned = String(value); }
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
  return val;
}

export function getRemainingValues(color: PlayerColor): number[] {
  const block = color === 'red' ? redBlock : blueBlock;
  if (!block) return [];
  const original = JSON.parse(block.dataset.original || '[]') as number[];
  const remainingIdx = getRemainingIndices(block);
  return remainingIdx.map((i) => original[i]).filter((v) => Number.isFinite(v));
}

function resolveMoveButtons() {
  let redMoveBtn = $<HTMLElement>('.player1 .move-button');
  let blueMoveBtn = $<HTMLElement>('.player2 .move-button');
  if (!redMoveBtn || !blueMoveBtn) {
    const all = Array.from(document.querySelectorAll<HTMLElement>('.move-button'));
    if (all.length >= 2) { redMoveBtn = all[0]; blueMoveBtn = all[1]; }
  }
  if (!redMoveBtn) redMoveBtn = $<HTMLElement>('#move1, [data-move="p1"]');
  if (!blueMoveBtn) blueMoveBtn = $<HTMLElement>('#move2, [data-move="p2"]');
  return { redMoveBtn, blueMoveBtn };
}

function mountBlocks(redMoveBtn: HTMLElement, blueMoveBtn: HTMLElement) {
  if (!redBlock) { redBlock = document.createElement('div'); redBlock.className = 'steps-block steps-red is-hidden'; redMoveBtn.insertAdjacentElement('beforebegin', redBlock); }
  if (!blueBlock) { blueBlock = document.createElement('div'); blueBlock.className = 'steps-block steps-blue is-hidden'; blueMoveBtn.insertAdjacentElement('afterend', blueBlock); }
}

const getBlock = (color: PlayerColor) => (color === 'red' ? redBlock! : blueBlock!);

export function setStepsEnabled(color: PlayerColor, enabled: boolean) {
  const block = color === 'red' ? redBlock : blueBlock;
  if (!block) return;
  block.querySelectorAll<HTMLButtonElement>('.step-btn').forEach((btn) => { btn.disabled = !enabled; });
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
  block.onclick = (e) => {
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
      setRemainingIndices(block, rem.filter((i) => !toRemove.includes(i)));
    };
    const setPlannedWithIndex = (val: number | null, idxs?: number[]) => {
      setPlanned(block, val);
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
    if (!combined) { resetToOriginal(block, color); return; }
    if (target === combined) { resetToOriginal(block, color); setPlannedWithIndex(null, []); return; }

    const newSum = getNum(combined) + getNum(target);
    combined.textContent = String(newSum);
    combined.dataset.step = String(newSum);
    const prevComponents = (() => { try { return JSON.parse(combined.dataset.components || '[]') as number[]; } catch { return []; } })();
    const newTargetIdx = Number(target.dataset.index);
    const updatedComponents = [...prevComponents, newTargetIdx];
    combined.dataset.components = JSON.stringify(updatedComponents);
    setDisabled(target);
    setPlannedWithIndex(newSum, updatedComponents);
    removeIndices([newTargetIdx]);
  };
}

export function createSteps() {
  const { redMoveBtn, blueMoveBtn } = resolveMoveButtons();
  if (!redMoveBtn || !blueMoveBtn) { requestAnimationFrame(createSteps); return; }
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

export function getRemainingForColor(color: PlayerColor): number[] {
  return getRemainingValues(color);
}

export function clearPlanned(color: PlayerColor) {
  const block = color === 'red' ? redBlock : blueBlock;
  if (!block) return;
  setPlanned(block, null);
  const original = JSON.parse(block.dataset.original || '[]') as number[];
  setRemainingIndices(block, original.map((_, i) => i));
  emitPlannedChange(color, null);
}

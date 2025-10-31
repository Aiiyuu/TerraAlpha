type Point = { x: number; y: number };

const FINAL_2 = 25;
const FINAL_1 = 26;
const FINAL_0 = 27;

const SPECIAL_CELLS = new Set([6, 12, 18]);

const STEP_BASE_MS = 160;
const SPECIAL_EXTRA_MS = 100;

function ensureFlyLayer(): HTMLElement {
  const board = document.querySelector<HTMLElement>('.board')!;
  let layer = board.querySelector<HTMLElement>('.ta-fly-layer');
  if (!layer) {
    layer = document.createElement('div');
    layer.className = 'ta-fly-layer';
    layer.style.position = 'absolute';
    layer.style.left = '0';
    layer.style.top = '0';
    layer.style.right = '0';
    layer.style.bottom = '0';
    layer.style.pointerEvents = 'none';
    layer.style.zIndex = '10';
    board.style.position ||= 'relative';
    board.appendChild(layer);
  }
  return layer;
}

function getCellCenter(el: HTMLElement): Point {
  const board = document.querySelector<HTMLElement>('.board')!;
  const br = board.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  return {
    x: r.left - br.left + r.width / 2,
    y: r.top - br.top + r.height / 2,
  };
}

function getCellByIndex(index: number): HTMLElement | null {
  if (index >= FINAL_0) {
    return (
      document.querySelector<HTMLElement>('.board [data-qa="final-0"]') ||
      document.querySelector<HTMLElement>('.board [data-qa^="final-"]')
    );
  }
  if (index === FINAL_1) {
    return (
      document.querySelector<HTMLElement>('.board [data-qa="final-1"]') ||
      document.querySelector<HTMLElement>('.board [data-qa="cell-26"]') ||
      document.querySelector<HTMLElement>('.board [data-qa="field-26"]') ||
      document.querySelector<HTMLElement>('.board .cell[data-index="26"]')
    );
  }
  if (index === FINAL_2) {
    return (
      document.querySelector<HTMLElement>('.board [data-qa="final-2"]') ||
      document.querySelector<HTMLElement>('.board [data-qa="cell-25"]') ||
      document.querySelector<HTMLElement>('.board [data-qa="field-25"]') ||
      document.querySelector<HTMLElement>('.board .cell[data-index="25"]')
    );
  }
  return (
    document.querySelector<HTMLElement>(`.board [data-qa="field-${index}"]`) ||
    document.querySelector<HTMLElement>(`.board [data-qa="cell-${index}"]`) ||
    document.querySelector<HTMLElement>(`.board .cell[data-index="${index}"]`)
  );
}

function buildPath(fromIndex: number | null, toIndex: number): { nodes: HTMLElement[]; indices: number[] } {
  const startStep = fromIndex == null ? 1 : fromIndex + 1;
  const endStep = toIndex;
  const nodes: HTMLElement[] = [];
  const indices: number[] = [];

  const push = (i: number) => {
    const cell = getCellByIndex(i);
    if (cell) {
      nodes.push(cell);
      indices.push(i);
    }
  };

  const limit = Math.min(endStep, FINAL_2 - 1);
  for (let i = startStep; i <= limit; i++) {
    push(i);
  }

  if (endStep >= FINAL_2) {
    if (startStep <= FINAL_2) push(FINAL_2);
    if (endStep >= FINAL_1 && startStep <= FINAL_1) push(FINAL_1);
    if (endStep >= FINAL_0) push(FINAL_0);
  }

  return { nodes, indices };
}

function pulseSpecial(cell: HTMLElement) {
  cell.classList.add('ta-special-pulse');
  setTimeout(() => cell.classList.remove('ta-special-pulse'), 300);
}

function cloneForFlight(src: HTMLElement): HTMLElement {
  const clone = src.cloneNode(true) as HTMLElement;
  clone.classList.add('ta-flyer');
  clone.style.position = 'absolute';
  clone.style.transform = 'translate(-50%, -50%)';
  clone.style.transitionProperty = 'transform';
  clone.style.transitionTimingFunction = 'linear';
  clone.style.pointerEvents = 'none';
  clone.style.zIndex = '10';
  return clone;
}

function placeAt(layer: HTMLElement, clone: HTMLElement, p: Point) {
  clone.style.left = `${p.x}px`;
  clone.style.top = `${p.y}px`;
  if (!clone.isConnected) layer.appendChild(clone);
}

function waitTransition(el: HTMLElement, ms: number) {
  return new Promise<void>((resolve) => {
    let done = false;
    const onEnd = () => {
      if (done) return;
      done = true;
      el.removeEventListener('transitionend', onEnd);
      resolve();
    };
    el.addEventListener('transitionend', onEnd, { once: true });
    setTimeout(onEnd, ms + 30);
  });
}

function stepDelay(base: number, idx: number) {
  return SPECIAL_CELLS.has(idx) ? base + SPECIAL_EXTRA_MS : base;
}

export async function flyShip(options: {
  shipEl: HTMLElement;
  fromIndex: number | null;
  toIndex: number;
  stepMs?: number;
  hideOriginal?: boolean;
}) {
  const { shipEl, fromIndex, toIndex, stepMs = STEP_BASE_MS, hideOriginal = true } = options;

  const layer = ensureFlyLayer();
  const { nodes: path, indices } = buildPath(fromIndex, toIndex);
  if (!path.length) return;

  const clone = cloneForFlight(shipEl);

  let startPoint: Point;
  if (fromIndex == null) {
    startPoint = getCellCenter(path[0]);
  } else {
    const fromCell = shipEl.closest<HTMLElement>('.cell,[data-qa^="field-"],[data-qa^="cell-"],[data-qa^="final-"]');
    startPoint = getCellCenter(fromCell || path[0]);
  }
  placeAt(layer, clone, startPoint);

  const prevVisibility = shipEl.style.visibility;
  if (hideOriginal) shipEl.style.visibility = 'hidden';

  for (let i = 0; i < path.length; i++) {
    const cell = path[i];
    const idx = indices[i];
    const duration = stepDelay(stepMs, idx);
    clone.style.transitionDuration = `${duration}ms`;
    if (SPECIAL_CELLS.has(idx)) pulseSpecial(cell);
    const p = getCellCenter(cell);
    placeAt(layer, clone, p);
    await waitTransition(clone, duration);
  }

  clone.remove();
  if (hideOriginal) shipEl.style.visibility = prevVisibility || '';
}

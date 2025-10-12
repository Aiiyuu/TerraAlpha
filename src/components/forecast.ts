import { getPlannedMove } from './steps.ts';

export type PlayerColor = 'red' | 'blue';

let lastHighlighted: HTMLElement | null = null;
let currentPlanned: number | null = null;
let lastHoveredShipEl: HTMLElement | null = null;
let getActiveColorRef: () => PlayerColor = () => 'red';

function clearForecast() {
  if (lastHighlighted) {
    lastHighlighted.classList.remove('is-forecast');
    lastHighlighted = null;
  }
}

function getFieldCellByIndex(index: number): HTMLElement | null {
  if (!Number.isFinite(index) || index <= 0) return null;
  return document.querySelector<HTMLElement>(`.board [data-qa="field-${index}"]`);
}

function parseFieldQa(qa: string | null): number | null {
  if (!qa) return null;
  const m = qa.match(/^field-(\d+)$/);
  return m ? Number(m[1]) : null;
}

function getShipColor(el: HTMLElement): PlayerColor | null {
  const qa = el.getAttribute('data-qa') || '';
  if (qa.startsWith('p1-cell-')) return 'red';
  if (qa.startsWith('p2-cell-')) return 'blue';
  if (el.closest('#player1, .player1')) return 'red';
  if (el.closest('#player2, .player2')) return 'blue';
  return null;
}

function isShipEl(el: HTMLElement | null): boolean {
  return !!el?.closest?.('.cell-btn, [data-ship], .ship');
}

function getFromFieldIndexIfOnBoard(el: HTMLElement): number | null {
  const parentCell = el.closest<HTMLElement>('.board .cell');
  if (!parentCell) return null;
  return parseFieldQa(parentCell.getAttribute('data-qa'));
}

function computeTargetIndex(shipEl: HTMLElement, planned: number): number | null {
  if (!Number.isFinite(planned) || planned <= 0) return null;
  const fromOnBoard = getFromFieldIndexIfOnBoard(shipEl);
  return fromOnBoard !== null ? fromOnBoard + planned : planned;
}

function highlightForecastForShip(shipEl: HTMLElement, color: PlayerColor, planned: number | null) {
  clearForecast();
  if (!Number.isFinite(planned) || (planned as number) <= 0) return;
  const targetIndex = computeTargetIndex(shipEl, planned as number);
  if (!Number.isFinite(targetIndex!)) return;
  const cell = getFieldCellByIndex(targetIndex as number);
  if (!cell) return;
  cell.classList.add('is-forecast');
  lastHighlighted = cell;
}

export function setupForecast(getActiveColor: () => PlayerColor) {
  getActiveColorRef = getActiveColor;

  document.addEventListener('steps:planned-change', (e: Event) => {
    const { color, planned } = (e as CustomEvent).detail as { color: PlayerColor; planned: number | null; };
    if (color !== getActiveColorRef()) return;
    currentPlanned = planned;
    if (lastHoveredShipEl) {
      const shipColor = getShipColor(lastHoveredShipEl);
      if (shipColor && shipColor === color) {
        highlightForecastForShip(lastHoveredShipEl, color, currentPlanned);
        return;
      }
    }
    clearForecast();
  });

  document.addEventListener('steps:request-forecast', (e: Event) => {
    const { color, planned, shipQa, fromCellQa } = (e as CustomEvent).detail as { color: PlayerColor; planned: number; shipQa?: string | null; fromCellQa?: string | null; };
    if (color !== getActiveColorRef()) return;
    let shipEl: HTMLElement | null = null;
    if (shipQa) shipEl = document.querySelector<HTMLElement>(`.cell-btn[data-qa="${shipQa}"]`);
    if (!shipEl) shipEl = lastHoveredShipEl;
    if (!Number.isFinite(planned) || planned <= 0) { clearForecast(); return; }
    if (fromCellQa) {
      clearForecast();
      const from = parseFieldQa(fromCellQa);
      if (from !== null) {
        const target = from + planned;
        const cell = getFieldCellByIndex(target);
        if (cell) {
          cell.classList.add('is-forecast');
          lastHighlighted = cell;
        }
      }
      return;
    }
    if (shipEl) {
      highlightForecastForShip(shipEl, color, planned);
    }
  });

  document.addEventListener('pointerenter', (ev) => {
    const el = (ev.target as HTMLElement)?.closest<HTMLElement>('.cell-btn, [data-ship], .ship');
    if (!el) return;
    const color = getShipColor(el) ?? getActiveColorRef();
    if (color !== getActiveColorRef()) return;
    lastHoveredShipEl = el;
    const planned = getPlannedMove(getActiveColorRef());
    currentPlanned = planned;
    highlightForecastForShip(el, color, planned);
  }, true);

  document.addEventListener('pointerleave', (ev) => {
    const leftEl = (ev.target as HTMLElement)?.closest<HTMLElement>('.cell-btn, [data-ship], .ship');
    if (!leftEl) return;
    const toEl = ev.relatedTarget as HTMLElement | null;
    if (isShipEl(toEl)) return;
    if (lastHoveredShipEl === leftEl) {
      lastHoveredShipEl = null;
      clearForecast();
    }
  }, true);

  document.addEventListener('focusout', (ev) => {
    const next = ev.relatedTarget as HTMLElement | null;
    if (next && (next.closest('.hand-grid') || next.closest('.board') || isShipEl(next))) return;
    clearForecast();
  });
}

import { getPlannedMove } from './steps.ts';

export type PlayerColor = 'red' | 'blue';

let lastHighlighted: HTMLElement | null = null;
let currentPlanned: number | null = null;
let lastFocusedShipEl: HTMLElement | null = null;
let getActiveColorRef: () => PlayerColor = () => 'red';

type DisableReason = 'disabledByTurn' | 'disabledByForecast';

function applyDisabled(el: HTMLElement, reason: DisableReason) {
  if (el.dataset[reason] === '1') return;
  el.dataset[reason] = '1';
  el.classList.add('is-disabled');
  if (el instanceof HTMLButtonElement) {
    el.disabled = true;
    el.setAttribute('tabindex', '-1');
    el.setAttribute('aria-disabled', 'true');
  } else {
    (el.style as any).pointerEvents = 'none';
    el.setAttribute('aria-disabled', 'true');
  }
}

function clearDisabled(el: HTMLElement | null, reason: DisableReason) {
  if (!el) return;
  if (el.dataset[reason] !== '1') return;
  delete el.dataset[reason];
  const stillDisabled =
    el.dataset.disabledByTurn === '1' || el.dataset.disabledByForecast === '1';
  if (!stillDisabled) {
    el.classList.remove('is-disabled');
    if (el instanceof HTMLButtonElement) {
      el.disabled = false;
      el.removeAttribute('tabindex');
      el.removeAttribute('aria-disabled');
    } else {
      (el.style as any).pointerEvents = '';
      el.removeAttribute('aria-disabled');
    }
  }
}

function clearForecast() {
  if (lastHighlighted) {
    lastHighlighted.classList.remove('is-forecast');
    lastHighlighted = null;
  }
  clearDisabled(lastFocusedShipEl, 'disabledByForecast');
}

function getFieldCellByIndex(index: number): HTMLElement | null {
  if (!Number.isFinite(index) || index <= 0) return null;
  return document.querySelector<HTMLElement>(`.board [data-qa="field-${index}"]`);
}

function getCellByQa(qa: string): HTMLElement | null {
  return document.querySelector<HTMLElement>(`.board [data-qa="${qa}"]`);
}

function parseFieldQa(qa: string | null): number | null {
  if (!qa) return null;
  const m = qa.match(/^field-(\d+)$/);
  return m ? Number(m[1]) : null;
}

function parseSpecialFieldQa(qa: string | null): { base: number; sub: 1 | 2 } | null {
  if (!qa) return null;
  const m = qa.match(/^field-(\d+)-(1|2)$/);
  return m ? { base: Number(m[1]), sub: Number(m[2]) as 1 | 2 } : null;
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

function getParentFieldQa(el: HTMLElement): string | null {
  const parentCell = el.closest<HTMLElement>('.board .cell');
  return parentCell?.getAttribute('data-qa') ?? null;
}

function getFromFieldIndexIfOnBoard(el: HTMLElement): number | null {
  const qa = getParentFieldQa(el);
  if (!qa) return null;
  const plain = parseFieldQa(qa);
  if (plain !== null) return plain;
  const sp = parseSpecialFieldQa(qa);
  return sp ? sp.base : null;
}

function targetHasButton(cell: HTMLElement): boolean {
  return !!cell.querySelector('.cell-btn, button, [data-ship], .ship');
}

const SPECIAL_MULTI = new Set([6, 12, 18]);

function pickForecastCell(targetIndex: number): HTMLElement | null {
  if (!Number.isFinite(targetIndex)) return null;
  if (SPECIAL_MULTI.has(targetIndex)) {
    const candidatesQa = [`field-${targetIndex}-1`, `field-${targetIndex}-2`];
    for (const qa of candidatesQa) {
      const cell = getCellByQa(qa);
      if (cell && !targetHasButton(cell)) return cell;
    }
    return null;
  }
  const cell = getFieldCellByIndex(targetIndex);
  if (cell && !targetHasButton(cell)) return cell;
  return null;
}

function computeTargetIndexForShip(shipEl: HTMLElement, steps: number): number | null {
  if (!Number.isFinite(steps) || steps <= 0) return null;
  const parentQa = getParentFieldQa(shipEl);
  if (!parentQa) return steps;
  const sp = parseSpecialFieldQa(parentQa);
  if (sp && SPECIAL_MULTI.has(sp.base)) {
    const minSteps = sp.sub + 1;
    if (steps < minSteps) return null;
    return sp.base + (steps - sp.sub);
  }
  const from = parseFieldQa(parentQa);
  if (from !== null) return from + steps;
  return null;
}

function computeTargetIndexFromQa(fromCellQa: string, steps: number): number | null {
  if (!Number.isFinite(steps) || steps <= 0) return null;
  const sp = parseSpecialFieldQa(fromCellQa);
  if (sp && SPECIAL_MULTI.has(sp.base)) {
    const minSteps = sp.sub + 1;
    if (steps < minSteps) return null;
    return sp.base + (steps - sp.sub);
  }
  const from = parseFieldQa(fromCellQa);
  if (from !== null) return from + steps;
  return null;
}

function clearAllForecastLocksForActiveColor() {
  const active = getActiveColorRef();
  document.querySelectorAll<HTMLElement>('.cell-btn, [data-ship], .ship').forEach(el => {
    const c = getShipColor(el);
    if (c === active) clearDisabled(el, 'disabledByForecast');
  });
}

function highlightForecastForShip(shipEl: HTMLElement, color: PlayerColor, planned: number | null) {
  clearForecast();
  clearAllForecastLocksForActiveColor();
  if (!Number.isFinite(planned) || (planned as number) <= 0) return;
  const targetIndex = computeTargetIndexForShip(shipEl, planned as number);
  if (!Number.isFinite(targetIndex!)) {
    applyDisabled(shipEl, 'disabledByForecast');
    return;
  }
  const cell = pickForecastCell(targetIndex as number);
  if (!cell) {
    applyDisabled(shipEl, 'disabledByForecast');
    return;
  }
  clearDisabled(shipEl, 'disabledByForecast');
  cell.classList.add('is-forecast');
  lastHighlighted = cell;
}

function enforceTurnInteractivity() {
  const active = getActiveColorRef();
  const ships = document.querySelectorAll<HTMLElement>('.cell-btn, [data-ship], .ship');
  ships.forEach(el => {
    const color = getShipColor(el);
    if (!color) return;
    if (color === active) {
      clearDisabled(el, 'disabledByTurn');
    } else {
      applyDisabled(el, 'disabledByTurn');
    }
  });
}

export function setupForecast(getActiveColor: () => PlayerColor) {
  getActiveColorRef = getActiveColor;
  enforceTurnInteractivity();

  document.addEventListener('steps:planned-change', (e: Event) => {
    const { color, planned } = (e as CustomEvent).detail as { color: PlayerColor; planned: number | null; };
    enforceTurnInteractivity();
    if (color !== getActiveColorRef()) return;
    clearAllForecastLocksForActiveColor();
    currentPlanned = planned;
    if (lastFocusedShipEl) {
      const shipColor = getShipColor(lastFocusedShipEl);
      if (shipColor && shipColor === color) {
        highlightForecastForShip(lastFocusedShipEl, color, currentPlanned);
        return;
      }
    }
    clearForecast();
  });

  document.addEventListener('steps:request-forecast', (e: Event) => {
    const { color, planned, shipQa, fromCellQa } = (e as CustomEvent).detail as {
      color: PlayerColor;
      planned: number;
      shipQa?: string | null;
      fromCellQa?: string | null;
    };
    enforceTurnInteractivity();
    if (color !== getActiveColorRef()) return;
    clearAllForecastLocksForActiveColor();
    let shipEl: HTMLElement | null = null;
    if (shipQa) shipEl = document.querySelector<HTMLElement>(`.cell-btn[data-qa="${shipQa}"]`);
    if (!shipEl) shipEl = lastFocusedShipEl;
    if (!Number.isFinite(planned) || planned <= 0) {
      clearForecast();
      return;
    }
    if (fromCellQa) {
      clearForecast();
      const target = computeTargetIndexFromQa(fromCellQa, planned);
      if (!Number.isFinite(target!)) {
        if (shipEl) applyDisabled(shipEl, 'disabledByForecast');
        return;
      }
      const cell = pickForecastCell(target as number);
      if (!cell) {
        if (shipEl) applyDisabled(shipEl, 'disabledByForecast');
        return;
      }
      if (shipEl) clearDisabled(shipEl, 'disabledByForecast');
      cell.classList.add('is-forecast');
      lastHighlighted = cell;
      return;
    }
    if (shipEl) {
      highlightForecastForShip(shipEl, color, planned);
    }
  });

  document.addEventListener('focusin', (ev) => {
    enforceTurnInteractivity();
    const el = (ev.target as HTMLElement)?.closest<HTMLElement>('.cell-btn, [data-ship], .ship');
    if (!el) return;
    const color = getShipColor(el) ?? getActiveColorRef();
    if (color !== getActiveColorRef()) {
      clearForecast();
      return;
    }
    lastFocusedShipEl = el;
    const planned = getPlannedMove(getActiveColorRef());
    currentPlanned = planned;
    highlightForecastForShip(el, color, planned);
  }, true);

  document.addEventListener('focusout', (ev) => {
    const next = ev.relatedTarget as HTMLElement | null;
    if (next && (next.closest('.hand-grid') || next.closest('.board') || isShipEl(next))) return;
    lastFocusedShipEl = null;
    clearForecast();
    enforceTurnInteractivity();
  }, true);
}

import { getPlannedMove } from './steps.ts';

export type PlayerColor = 'red' | 'blue';

let lastHighlighted: HTMLElement | null = null;
let currentPlanned: number | null = null;
let lastFocusedShipEl: HTMLElement | null = null;
let lastMergeCueShipEl: HTMLElement | null = null;
let getActiveColorRef: () => PlayerColor = () => 'red';

type DisableReason = 'disabledByTurn' | 'disabledByForecast';
type ShipRole = 'mother' | 'normal';

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

function isFinalQa(qa: string | null): qa is 'final-0' | 'final-1' | 'final-2' {
  return qa === 'final-0' || qa === 'final-1' || qa === 'final-2';
}

function getParentFieldQa(el: HTMLElement): string | null {
  const parentCell = el.closest<HTMLElement>('.board .cell');
  return parentCell?.getAttribute('data-qa') ?? null;
}

function isShipEl(el: HTMLElement | null): boolean {
  return !!el?.closest?.('.cell-btn, [data-ship], .ship');
}

function findShipInCell(cell: HTMLElement): HTMLElement | null {
  return cell.querySelector<HTMLElement>('.cell-btn, [data-ship], .ship');
}

function getShipColor(el: HTMLElement): PlayerColor | null {
  const qa = el.getAttribute('data-qa') || '';
  if (qa.startsWith('p1-cell-')) return 'red';
  if (qa.startsWith('p2-cell-')) return 'blue';
  if (el.closest('#player1, .player1')) return 'red';
  if (el.closest('#player2, .player2')) return 'blue';
  return null;
}

function getShipRole(el: HTMLElement): ShipRole {
  if (
    el.getAttribute('data-ship') === 'mother' ||
    el.classList.contains('is-mother') ||
    el.classList.contains('ship--mother')
  ) {
    return 'mother';
  }
  return 'normal';
}

function sameColor(a: HTMLElement | null, b: HTMLElement | null): boolean {
  if (!a || !b) return false;
  const ca = getShipColor(a);
  const cb = getShipColor(b);
  return !!ca && ca === cb;
}

function computeFinalTargetQaFromStart(parentQa: string, steps: number): string | null {
  if (parentQa === 'final-2') {
    if (steps >= 2) return 'final-0';
    if (steps === 1) return 'final-1';
    return null;
  }
  if (parentQa === 'final-1') {
    if (steps >= 1) return 'final-0';
    return null;
  }
  return null;
}

const SPECIAL_MULTI = new Set([6, 12, 18]);

function computeTargetIndexForShip(shipEl: HTMLElement, steps: number): number | null {
  if (!Number.isFinite(steps) || steps <= 0) return null;
  const parentQa = getParentFieldQa(shipEl);
  if (!parentQa) return steps;
  if (isFinalQa(parentQa)) return null;
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
  if (isFinalQa(fromCellQa as any)) return null;
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

/* ---------- Merge-friendly forecast rules ---------- */

type ForecastResolution =
  | { kind: 'emptyCell'; cell: HTMLElement }
  | { kind: 'mergeWithOwn'; cell: HTMLElement; mergeTargetShip: HTMLElement };

function resolveCellForIndexWithMerge(
  targetIndex: number,
  focusedShipEl: HTMLElement,
  color: PlayerColor
): ForecastResolution | null {
  // 1) SPECIAL MULTI: field-X-1 / field-X-2
  if (SPECIAL_MULTI.has(targetIndex)) {
    const candidatesQa = [`field-${targetIndex}-1`, `field-${targetIndex}-2`];
    for (const qa of candidatesQa) {
      const cell = getCellByQa(qa);
      if (!cell) continue;
      const occ = findShipInCell(cell);
      if (!occ) return { kind: 'emptyCell', cell };
      if (getShipColor(occ) === color) {
        const ok = isMergeAllowed(focusedShipEl, occ);
        if (ok) return { kind: 'mergeWithOwn', cell, mergeTargetShip: occ };
      }
      // чужий або заборонений мердж → ця підкомірка не підходить, пробуємо наступну
    }
    return null;
  }

  // 2) FINAL SECTION shortcuts: 27+ → final-0, 26 → final-1, 25 → final-2, 24 → final-2|final-1
  if (targetIndex >= 27) {
    const cell = getCellByQa('final-0');
    if (!cell) return null;
    const occ = findShipInCell(cell);
    if (!occ) return { kind: 'emptyCell', cell };
    if (getShipColor(occ) === color && isMergeAllowed(focusedShipEl, occ)) {
      return { kind: 'mergeWithOwn', cell, mergeTargetShip: occ };
    }
    return null;
  }
  if (targetIndex === 26) {
    const cell = getCellByQa('final-1');
    if (!cell) return null;
    const occ = findShipInCell(cell);
    if (!occ) return { kind: 'emptyCell', cell };
    if (getShipColor(occ) === color && isMergeAllowed(focusedShipEl, occ)) {
      return { kind: 'mergeWithOwn', cell, mergeTargetShip: occ };
    }
    return null;
  }
  if (targetIndex === 25) {
    const cell = getCellByQa('final-2');
    if (!cell) return null;
    const occ = findShipInCell(cell);
    if (!occ) return { kind: 'emptyCell', cell };
    if (getShipColor(occ) === color && isMergeAllowed(focusedShipEl, occ)) {
      return { kind: 'mergeWithOwn', cell, mergeTargetShip: occ };
    }
    return null;
  }
  if (targetIndex === 24) {
    // Пріоритет: final-2, якщо зайнята — перевіряємо мердж; інакше final-1
    for (const qa of ['final-2', 'final-1'] as const) {
      const cell = getCellByQa(qa);
      if (!cell) continue;
      const occ = findShipInCell(cell);
      if (!occ) return { kind: 'emptyCell', cell };
      if (getShipColor(occ) === color && isMergeAllowed(focusedShipEl, occ)) {
        return { kind: 'mergeWithOwn', cell, mergeTargetShip: occ };
      }
    }
    return null;
  }

  // 3) REGULAR field-N
  const cell = getFieldCellByIndex(targetIndex);
  if (!cell) return null;
  const occ = findShipInCell(cell);
  if (!occ) return { kind: 'emptyCell', cell };
  if (getShipColor(occ) === color && isMergeAllowed(focusedShipEl, occ)) {
    return { kind: 'mergeWithOwn', cell, mergeTargetShip: occ };
  }
  return null;
}

function pickFinalForecastCell(finalQa: 'final-0' | 'final-1' | 'final-2'): HTMLElement | null {
  const cell = getCellByQa(finalQa);
  if (!cell) return null;
  const occ = findShipInCell(cell);
  return occ ? null : cell;
}

function isMergeAllowed(focused: HTMLElement, occupant: HTMLElement): boolean {
  if (!sameColor(focused, occupant)) return false;
  const fRole = getShipRole(focused);
  const oRole = getShipRole(occupant);
  // Дозволяємо лише взаємно доповнюючі випадки:
  // mother → normal  або normal → mother
  if (fRole === 'mother' && oRole === 'normal') return true;
  if (fRole === 'normal' && oRole === 'mother') return true;
  return false;
}

/* ---------- Visual cues (merge pulse) ---------- */

function clearMergeCue() {
  if (lastMergeCueShipEl) {
    lastMergeCueShipEl.classList.remove('ship-merge-cue', 'ship-merge-scale', 'ship-merge-vibrate');
    lastMergeCueShipEl.removeAttribute('aria-live');
    lastMergeCueShipEl.removeAttribute('aria-label');
    lastMergeCueShipEl = null;
  }
}

function applyMergeCue(targetShipEl: HTMLElement) {
  clearMergeCue();
  targetShipEl.classList.add('ship-merge-cue', 'ship-merge-scale', 'ship-merge-vibrate');
  targetShipEl.setAttribute('aria-live', 'polite');
  targetShipEl.setAttribute('aria-label', 'Merge target');
  lastMergeCueShipEl = targetShipEl;
}

/* ---------- Forecast highlight orchestration ---------- */

function clearForecast() {
  if (lastHighlighted) {
    lastHighlighted.classList.remove('is-forecast');
    lastHighlighted = null;
  }
  clearMergeCue();
  clearDisabled(lastFocusedShipEl, 'disabledByForecast');
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

  const parentQa = getParentFieldQa(shipEl);
  // Якщо стоїмо у фіналі — працюємо старими правилами переходу між final-* (мердж у фіналі не описаний в ТЗ старту, тож не допускаємо)
  if (parentQa && isFinalQa(parentQa)) {
    const finalQa = computeFinalTargetQaFromStart(parentQa, planned as number);
    if (!finalQa) {
      applyDisabled(shipEl, 'disabledByForecast');
      return;
    }
    const cell = pickFinalForecastCell(finalQa as any);
    if (!cell) {
      applyDisabled(shipEl, 'disabledByForecast');
      return;
    }
    clearDisabled(shipEl, 'disabledByForecast');
    cell.classList.add('is-forecast');
    lastHighlighted = cell;
    return;
  }

  const targetIndex = computeTargetIndexForShip(shipEl, planned as number);
  if (!Number.isFinite(targetIndex!)) {
    applyDisabled(shipEl, 'disabledByForecast');
    return;
  }

  const resolved = resolveCellForIndexWithMerge(targetIndex as number, shipEl, color);
  if (!resolved) {
    applyDisabled(shipEl, 'disabledByForecast');
    return;
  }

  clearDisabled(shipEl, 'disabledByForecast');

  if (resolved.kind === 'emptyCell') {
    // Класична підсвітка кружком
    resolved.cell.classList.add('is-forecast');
    lastHighlighted = resolved.cell;
    clearMergeCue();
    return;
  }

  // MERGE CASE: не показуємо кружок, але вмикаємо анімацію у корабля в цільовій клітинці
  clearMergeCue();
  applyMergeCue(resolved.mergeTargetShip);
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

/* ---------- Public setup ---------- */

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

      if (isFinalQa(fromCellQa as any)) {
        const finalQa = computeFinalTargetQaFromStart(fromCellQa as any, planned);
        if (!finalQa) {
          if (shipEl) applyDisabled(shipEl, 'disabledByForecast');
          return;
        }
        const cell = pickFinalForecastCell(finalQa as any);
        if (!cell) {
          if (shipEl) applyDisabled(shipEl, 'disabledByForecast');
          return;
        }
        if (shipEl) clearDisabled(shipEl, 'disabledByForecast');
        cell.classList.add('is-forecast');
        lastHighlighted = cell;
        return;
      }

      const target = computeTargetIndexFromQa(fromCellQa, planned);
      if (!Number.isFinite(target!)) {
        if (shipEl) applyDisabled(shipEl, 'disabledByForecast');
        return;
      }
      if (!shipEl) return;

      const resolved = resolveCellForIndexWithMerge(target as number, shipEl, color);
      if (!resolved) {
        applyDisabled(shipEl, 'disabledByForecast');
        return;
      }
      clearDisabled(shipEl, 'disabledByForecast');

      if (resolved.kind === 'emptyCell') {
        resolved.cell.classList.add('is-forecast');
        lastHighlighted = resolved.cell;
        clearMergeCue();
      } else {
        clearMergeCue();
        applyMergeCue(resolved.mergeTargetShip);
      }
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

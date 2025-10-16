import { getPlannedMove } from './steps.ts';
import { gameState } from './state.ts';

export type PlayerColor = 'red' | 'blue';

let lastHighlighted: HTMLElement | null = null;
let lastMergeCueShipEl: HTMLElement | null = null;
let currentPlanned: number | null = null;
let lastFocusedShipEl: HTMLElement | null = null;
let getActiveColorRef: () => PlayerColor = () => 'red';

type DisableReason = 'disabledByTurn' | 'disabledByForecast';
type ShipRole = 'mother' | 'normal';

const SPECIAL_MULTI = new Set([6, 12, 18]);

/* -------------------- low-level utils -------------------- */

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

function getCellByQa(qa: string): HTMLElement | null {
  return document.querySelector<HTMLElement>(`.board [data-qa="${qa}"]`);
}

function getFieldCellByIndex(index: number): HTMLElement | null {
  if (!Number.isFinite(index) || index <= 0) return null;
  return getCellByQa(`field-${index}`);
}

function findShipInCell(cell: HTMLElement | null): HTMLElement | null {
  if (!cell) return null;
  return cell.querySelector<HTMLElement>('.cell-btn, [data-ship], .ship');
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

function getShipColor(el: HTMLElement): PlayerColor | null {
  const qa = el.getAttribute('data-qa') || '';
  if (qa.startsWith('p1-')) return 'red';
  if (qa.startsWith('p2-')) return 'blue';
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

function sameColor(a: PlayerColor | null, b: PlayerColor | null) {
  return !!a && !!b && a === b;
}

/* -------------------- state-first occupancy helpers -------------------- */

type StateOccupant = {
  color: PlayerColor;
  role?: ShipRole;
  // опційно може існувати посилання на DOM-вузол, якщо ти так зберігаєш
  el?: HTMLElement | null;
};

function getStateOccupant(qa: string): StateOccupant | null {
  const occ = (gameState as any).getOccupant?.(qa);
  if (!occ) return null;
  // допускаємо різні форми у стейті; нормалізуємо:
  const color: PlayerColor | null = occ.color ?? occ?.player ?? null;
  const role: ShipRole | undefined =
    occ.role ?? (occ?.isMother ? 'mother' : undefined);
  return color ? { color, role, el: occ.el ?? null } : null;
}

function getDomOccupant(qa: string): { el: HTMLElement; color: PlayerColor | null; role: ShipRole } | null {
  const cell = getCellByQa(qa);
  const el = findShipInCell(cell);
  if (!el) return null;
  const color = getShipColor(el);
  const role = getShipRole(el);
  return { el, color, role };
}

function getOccupant(qa: string): { color: PlayerColor; role: ShipRole; el: HTMLElement | null } | null {
  const st = getStateOccupant(qa);
  if (st) {
    // якщо у стейті немає ролі/елемента — доберемо з DOM (але не зламаємо колір)
    const dom = getDomOccupant(qa);
    const role = st.role ?? dom?.role ?? 'normal';
    const el = st.el ?? dom?.el ?? null;
    return { color: st.color, role, el };
  }
  const dom = getDomOccupant(qa);
  if (!dom || !dom.color) return null;
  return { color: dom.color, role: dom.role, el: dom.el };
}

function isCellFree(qa: string): boolean {
  // state → truth; DOM only as fallback
  const occ = getStateOccupant(qa);
  if (occ) return false;
  const dom = getDomOccupant(qa);
  return !dom;
}

/* -------------------- movement math -------------------- */

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

function computeTargetIndexForShip(shipEl: HTMLElement, steps: number): number | null {
  if (!Number.isFinite(steps) || steps <= 0) return null;
  const parentQa = getParentFieldQa(shipEl);
  if (!parentQa) return steps; // з руки: старт як з 0
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

/* -------------------- forecast resolution (with merge) -------------------- */

type ForecastResolution =
  | { kind: 'emptyCell'; qa: string; cell: HTMLElement }
  | { kind: 'mergeWithOwn'; qa: string; cell: HTMLElement; mergeTargetEl: HTMLElement };

function isMergeAllowed(focused: { color: PlayerColor; role: ShipRole },
                        occupant: { color: PlayerColor; role: ShipRole }): boolean {
  if (focused.color !== occupant.color) return false;
  // дозволяємо mother↔normal
  return (
    (focused.role === 'mother' && occupant.role === 'normal') ||
    (focused.role === 'normal' && occupant.role === 'mother')
  );
}

function resolveQaCandidatesWithMerge(
  candidatesQa: string[],
  focusedShipEl: HTMLElement,
  color: PlayerColor
): ForecastResolution | null {
  const focusedRole: ShipRole = getShipRole(focusedShipEl);

  for (const qa of candidatesQa) {
    // final-* мердж не дозволяємо
    const inFinal = isFinalQa(qa as any);

    const stOcc = getOccupant(qa);
    if (!stOcc) {
      // вільно за стейтом/DOM
      if (inFinal) {
        // final: ок, просто вільна клітинка
        const cell = getCellByQa(qa);
        if (!cell) continue;
        return { kind: 'emptyCell', qa, cell };
      }
      const cell = getCellByQa(qa);
      if (!cell) continue;
      return { kind: 'emptyCell', qa, cell };
    }

    // зайнято — пробуємо мердж
    if (!inFinal) {
      const occEl = stOcc.el ?? getDomOccupant(qa)?.el ?? null;
      const occRole = stOcc.role;
      const ok = isMergeAllowed({ color, role: focusedRole }, { color: stOcc.color, role: occRole });
      if (ok && occEl) {
        const cell = getCellByQa(qa);
        if (!cell) continue;
        return { kind: 'mergeWithOwn', qa, cell, mergeTargetEl: occEl };
      }
    }
    // інакше кандидат непридатний — продовжуємо
  }
  return null;
}

function makeCandidatesForIndex(targetIndex: number): string[] {
  if (SPECIAL_MULTI.has(targetIndex)) {
    return [`field-${targetIndex}-1`, `field-${targetIndex}-2`];
  }
  if (targetIndex === 24) return ['final-2', 'final-1'];
  if (targetIndex === 25) return ['final-2'];
  if (targetIndex === 26) return ['final-1'];
  if (targetIndex >= 27) return ['final-0'];
  return [`field-${targetIndex}`];
}

function resolveIndexWithMerge(
  targetIndex: number,
  focusedShipEl: HTMLElement,
  color: PlayerColor
): ForecastResolution | null {
  const candidates = makeCandidatesForIndex(targetIndex);
  return resolveQaCandidatesWithMerge(candidates, focusedShipEl, color);
}

/* -------------------- visual cues -------------------- */

function clearMergeCue() {
  if (lastMergeCueShipEl) {
    lastMergeCueShipEl.classList.remove('ship-merge-vibrate');
    lastMergeCueShipEl.removeAttribute('aria-live');
    lastMergeCueShipEl.removeAttribute('aria-label');
    lastMergeCueShipEl = null;
  }
}

function applyMergeCue(targetShipEl: HTMLElement) {
  clearMergeCue();
  targetShipEl.classList.add('ship-merge-vibrate');
  targetShipEl.setAttribute('aria-live', 'polite');
  targetShipEl.setAttribute('aria-label', 'Merge target');
  lastMergeCueShipEl = targetShipEl;
}

/* -------------------- forecast orchestration -------------------- */

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

  // Якщо стоїмо у фіналі — мердж у фіналі не підтримуємо
  if (parentQa && isFinalQa(parentQa)) {
    const finalQa = computeFinalTargetQaFromStart(parentQa, planned as number);
    if (!finalQa || !isCellFree(finalQa)) {
      applyDisabled(shipEl, 'disabledByForecast');
      return;
    }
    clearDisabled(shipEl, 'disabledByForecast');
    const cell = getCellByQa(finalQa);
    if (!cell) return;
    cell.classList.add('is-forecast');
    lastHighlighted = cell;
    return;
  }

  const targetIndex = computeTargetIndexForShip(shipEl, planned as number);
  if (!Number.isFinite(targetIndex!)) {
    applyDisabled(shipEl, 'disabledByForecast');
    return;
  }

  const resolved = resolveIndexWithMerge(targetIndex as number, shipEl, color);
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
    // merge case — без кружка, показуємо вібрацію на кораблі в клітинці
    clearMergeCue();
    applyMergeCue(resolved.mergeTargetEl);
  }
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

/* -------------------- public setup -------------------- */

export function setupForecast(getActiveColor: () => PlayerColor) {
  getActiveColorRef = getActiveColor;
  enforceTurnInteractivity();

  document.addEventListener('steps:planned-change', (e: Event) => {
    const { color, planned } = (e as CustomEvent).detail as {
      color: PlayerColor; planned: number | null;
    };
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
        if (!finalQa || !isCellFree(finalQa)) {
          if (shipEl) applyDisabled(shipEl, 'disabledByForecast');
          return;
        }
        if (shipEl) clearDisabled(shipEl, 'disabledByForecast');
        const cell = getCellByQa(finalQa);
        if (!cell) return;
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

      const resolved = resolveIndexWithMerge(target as number, shipEl, color);
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
        applyMergeCue(resolved.mergeTargetEl);
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

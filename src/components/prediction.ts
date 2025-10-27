import Steps from '../components/stepsButtons';

type IndexLike = number | string;

const SPECIAL_REDIRECT: Record<string, string[]> = {
  '6': ['6-1', '6-2'],
  '12': ['12-1', '12-2'],
  '18': ['18-1', '18-2'],
};

function getCellByIndex(index: IndexLike): HTMLElement | null {
  const idx = String(index);
  return (
    document.querySelector<HTMLElement>(`.board [data-qa="field-${idx}"]`) ||
    document.querySelector<HTMLElement>(`.board [data-qa="cell-${idx}"]`) ||
    document.querySelector<HTMLElement>(`.board .cell[data-index="${idx}"]`) ||
    document.getElementById(`field-${idx}`) ||
    document.getElementById(`cell-${idx}`)
  );
}

function parseCellParts(cell: HTMLElement): { base: number; sub: number | null } | null {
  const qa = cell.getAttribute('data-qa') || cell.id || cell.getAttribute('data-index') || '';
  const m = qa.match(/(?:^|\s)(?:field|cell)-(\d+)(?:-(\d))?/);
  if (!m) return null;
  return { base: Number(m[1]), sub: m[2] ? Number(m[2]) : null };
}

function getFromPartsIfOnBoard(el: HTMLElement): { base: number; sub: number | null } | null {
  const parentCell =
    el.closest<HTMLElement>('.board [data-qa^="field-"], .board [data-qa^="cell-"], .board .cell[data-index]');
  if (!parentCell) return null;
  return parseCellParts(parentCell);
}

function isOccupied(cell: HTMLElement | null): boolean {
  if (!cell) return false;
  return !!cell.querySelector('.ship, [data-role="ship"], button.ship, .cell-btn');
}

function clearPrediction() {
  document.querySelectorAll('.board .is-predicted').forEach((el) => el.classList.remove('is-predicted'));
}

function pickupShipEl(scope: HTMLElement | null): HTMLElement | null {
  if (!scope) return null;
  return (
    scope.closest<HTMLElement>('.cell-btn, [data-ship], .ship, button.ship') ||
    scope.querySelector<HTMLElement>('.cell-btn, [data-ship], .ship, button.ship') ||
    null
  );
}

function setShipLocked(el: HTMLElement, locked: boolean) {
  if (locked) {
    el.classList.add('is-disabled');
    el.setAttribute('aria-disabled', 'true');
    el.setAttribute('data-prediction-locked', '1');
  } else {
    el.classList.remove('is-disabled');
    el.removeAttribute('aria-disabled');
    el.removeAttribute('data-prediction-locked');
  }
}

function pickLandingCell(targetBase: number): HTMLElement | null {
  const alts = SPECIAL_REDIRECT[String(targetBase)];
  if (alts) {
    for (const idx of alts) {
      const c = getCellByIndex(idx);
      if (c && !isOccupied(c)) return c;
    }
    return null;
  }
  const cell = getCellByIndex(targetBase);
  if (!cell || isOccupied(cell)) return null;
  return cell;
}

function highlightFrom(shipEl: HTMLElement, planned: number | null): boolean {
  clearPrediction();
  if (!Number.isFinite(planned) || (planned as number) <= 0) return false;

  const steps = planned as number;
  const from = getFromPartsIfOnBoard(shipEl);

  if (!from) {
    const target = pickLandingCell(steps);
    if (!target) return false;
    target.classList.add('is-predicted');
    return true;
  }

  const isSpecialBase = from.base === 6 || from.base === 12 || from.base === 18;

  if (isSpecialBase && from.sub != null) {
    if (from.sub === 1) {
      if (steps <= 1) return false;
      const targetBase = from.base + (steps - 1);
      const target = pickLandingCell(targetBase);
      if (!target) return false;
      target.classList.add('is-predicted');
      return true;
    }
    if (from.sub === 2) {
      if (steps <= 2) return false;
      const targetBase = from.base + (steps - 3);
      const target = pickLandingCell(targetBase);
      if (!target) return false;
      target.classList.add('is-predicted');
      return true;
    }
  }

  const targetBase = from.base + steps;
  const target = pickLandingCell(targetBase);
  if (!target) return false;
  target.classList.add('is-predicted');
  return true;
}

export function setupPrediction() {
  document.addEventListener(
    'pointerenter',
    (ev) => {
      const raw = ev.target as HTMLElement;
      const scope = raw?.closest<HTMLElement>('.cell, .cell-btn, [data-ship], .ship, button.ship') || null;
      const shipEl = pickupShipEl(scope);
      if (!shipEl) return;
      const planned = Steps.getStepsForMove();
      const ok = highlightFrom(shipEl, planned);
      setShipLocked(shipEl, !ok);
    },
    true,
  );

  document.addEventListener(
    'pointerleave',
    (ev) => {
      const raw = ev.target as HTMLElement;
      const scope = raw?.closest<HTMLElement>('.cell, .cell-btn, [data-ship], .ship, button.ship') || null;
      const shipEl = pickupShipEl(scope);
      if (!shipEl) return;
      setShipLocked(shipEl, false);
      clearPrediction();
    },
    true,
  );
}

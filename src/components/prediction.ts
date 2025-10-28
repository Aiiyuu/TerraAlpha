import Steps from '../components/stepsButtons';

type IndexLike = number | string;

const SPECIAL_REDIRECT: Record<string, string[]> = {
  '6': ['6-1', '6-2'],
  '12': ['12-1', '12-2'],
  '18': ['18-1', '18-2'],
  '24': ['final-2', 'final-1'],
};

function getCellByIndex(index: IndexLike): HTMLElement | null {
  const idx = String(index);
  if (idx === '25') return document.querySelector<HTMLElement>('[data-qa="final-2"]') || document.getElementById('final-2');
  if (idx === '26') return document.querySelector<HTMLElement>('[data-qa="final-1"]') || document.getElementById('final-1');
  if (idx === '27' || idx === 'final-0') return document.querySelector<HTMLElement>('[data-qa="final-0"]') || document.getElementById('final-0');
  return (
    document.querySelector<HTMLElement>(`.board [data-qa="field-${idx}"]`) ||
    document.querySelector<HTMLElement>(`.board [data-qa="cell-${idx}"]`) ||
    document.querySelector<HTMLElement>(`.board [data-qa="${idx}"]`) ||
    document.querySelector<HTMLElement>(`.board .cell[data-index="${idx}"]`) ||
    document.getElementById(`field-${idx}`) ||
    document.getElementById(`cell-${idx}`)
  );
}

function parseCellParts(cell: HTMLElement): { base: number | null; sub: string | null } | null {
  const qa = cell.getAttribute('data-qa') || '';
  const m = qa.match(/(?:field|cell)-(\d+)(?:-(\d))?|final-(\d)/);
  if (!m) return null;
  if (m[3] !== undefined) {
    if (m[3] === '2') return { base: 25, sub: m[3] };
    if (m[3] === '1') return { base: 26, sub: m[3] };
    if (m[3] === '0') return { base: 27, sub: m[3] };
  }
  return { base: Number(m[1]), sub: m[2] || null };
}

function getFromPartsIfOnBoard(el: HTMLElement): { base: number | null; sub: string | null } | null {
  const parentCell = el.closest<HTMLElement>(
    '.board [data-qa^="field-"], .board [data-qa^="cell-"], .board [data-qa^="final-"], .board .cell[data-index]',
  );
  if (!parentCell) return null;
  return parseCellParts(parentCell);
}

function getShipSide(el: HTMLElement): 'left' | 'right' | null {
  const ds = el.getAttribute('data-side') || el.dataset.side || '';
  if (ds === 'left' || ds === 'right') return ds;
  const qa = el.getAttribute('data-qa') || '';
  const pref = qa.match(/^(p[12])-/)?.[1];
  if (pref === 'p1') return 'left';
  if (pref === 'p2') return 'right';
  if (el.classList.contains('left')) return 'left';
  if (el.classList.contains('right')) return 'right';
  return null;
}

function isMotherShip(el: HTMLElement): boolean {
  if (!el) return false;
  if (el.matches('[data-role="mother"],[data-ship="mother"],[data-mother="1"],.mother-ship')) return true;
  const qa = el.getAttribute('data-qa') || '';
  if (/-cell-8$/.test(qa)) return true;
  return false;
}

function getCellOccupant(cell: HTMLElement | null): { el: HTMLElement; side: 'left' | 'right' | null; isMother: boolean } | null {
  if (!cell) return null;
  const occ = cell.querySelector<HTMLElement>('.ship, [data-role="ship"], button.ship, .cell-btn, [data-ship]') || null;
  if (!occ) return null;
  return { el: occ, side: getShipSide(occ), isMother: isMotherShip(occ) };
}

function isOccupied(cell: HTMLElement | null): boolean {
  return !!getCellOccupant(cell);
}

function clearPrediction() {
  document.querySelectorAll('.board .is-predicted').forEach((el) => el.classList.remove('is-predicted'));
  document.querySelectorAll('.board .ta-bump').forEach((el) => el.closest('.cell-btn')?.classList.remove('ta-bump'));
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

function pickLandingCell(targetBase: number | string): HTMLElement | null {
  if (String(targetBase) === '27' || String(targetBase) === 'final-0') return getCellByIndex('final-0');
  const alts = SPECIAL_REDIRECT[String(targetBase)];
  if (alts) {
    for (const idx of alts) {
      const c = getCellByIndex(idx);
      if (c && !isOccupied(c)) return c;
    }
    return null;
  }
  const cell = getCellByIndex(targetBase);
  if (!cell) return null;
  return cell;
}

function computeTargetCell(from: { base: number | null; sub: string | null } | null, steps: number): HTMLElement | null {
  if (!Number.isFinite(steps) || steps <= 0) return null;
  if (!from) {
    const proj = steps;
    if (proj >= 27) return getCellByIndex('final-0');
    return pickLandingCell(proj);
  }

  const { base, sub } = from;
  if (base == null) return null;

  if (base === 6 || base === 12 || base === 18) {
    if (sub === '1') {
      if (steps <= 1) return null;
      const proj = base + (steps - 1);
      if (proj >= 27) return getCellByIndex('final-0');
      return pickLandingCell(proj);
    }
    if (sub === '2') {
      if (steps <= 2) return null;
      const proj = base + (steps - 3);
      if (proj >= 27) return getCellByIndex('final-0');
      return pickLandingCell(proj);
    }
  }

  if (base === 24) {
    const alts = ['final-2', 'final-1'];
    for (const idx of alts) {
      const c = getCellByIndex(idx);
      if (c && !isOccupied(c)) return c;
    }
    return null;
  }

  if (base === 23 && steps >= 4) return getCellByIndex('final-0');
  if (base === 25 && steps >= 2) return getCellByIndex('final-0');
  if (base === 26 && steps >= 1) return getCellByIndex('final-0');

  const proj = base + steps;
  if (proj >= 27) return getCellByIndex('final-0');
  return pickLandingCell(proj);
}

function highlightFromEl(shipEl: HTMLElement, planned: number | null): boolean {
  clearPrediction();
  if (!Number.isFinite(planned) || (planned as number) <= 0) return false;

  const steps = planned as number;
  const from = getFromPartsIfOnBoard(shipEl);
  const target = computeTargetCell(from, steps);
  if (!target) return false;

  const occ = getCellOccupant(target);
  const activeSide = getShipSide(shipEl);
  const activeIsMother = isMotherShip(shipEl);

  if (occ) {
    if (!occ.side || !activeSide) return false;
    if (occ.side !== activeSide) return false;

    if (activeIsMother && !occ.isMother) {
      occ.el.closest('.cell-btn')?.classList.add('ta-bump');
      return true;
    }
    if (!activeIsMother && occ.isMother) {
      occ.el.closest('.cell-btn')?.classList.add('ta-bump');
      return true;
    }
    return false;
  }

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

      const side = getShipSide(shipEl);
      const mySide = document.body.getAttribute('data-turn-side');
      if (mySide && side && mySide !== side) return; // 🚫 чужі кораблі ігноруються

      const planned = Steps.getStepsForMove();
      const ok = highlightFromEl(shipEl, planned);
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

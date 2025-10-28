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
  if (idx === '25') {
    const f2 =
      document.querySelector<HTMLElement>('.board [data-qa="final-2"]') ||
      document.getElementById('final-2');
    if (f2) return f2;
  }
  if (idx === '26') {
    const f1 =
      document.querySelector<HTMLElement>('.board [data-qa="final-1"]') ||
      document.getElementById('final-1');
    if (f1) return f1;
  }
  if (idx === '27' || idx === 'final-0') {
    const f0 =
      document.querySelector<HTMLElement>('.board [data-qa="final-0"]') ||
      document.getElementById('final-0');
    if (f0) return f0;
  }
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

function pickLandingCell(targetBase: number | string): HTMLElement | null {
  if (String(targetBase) === '27' || String(targetBase) === 'final-0') {
    const f0 = getCellByIndex('final-0');
    return f0 || null;
  }
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

  const { base, sub } = from;
  if (base == null) return false;

  if (base === 6 || base === 12 || base === 18) {
    if (sub === '1') {
      if (steps <= 1) return false;
      const targetBase = base + (steps - 1);
      const target = pickLandingCell(targetBase);
      if (!target) return false;
      target.classList.add('is-predicted');
      return true;
    }
    if (sub === '2') {
      if (steps <= 2) return false;
      const targetBase = base + (steps - 3);
      const target = pickLandingCell(targetBase);
      if (!target) return false;
      target.classList.add('is-predicted');
      return true;
    }
  }

  if (base === 24) {
    const alts = ['final-2', 'final-1'];
    for (const idx of alts) {
      const c = getCellByIndex(idx);
      if (c && !isOccupied(c)) {
        c.classList.add('is-predicted');
        return true;
      }
    }
    return false;
  }

  if (base === 23 && steps >= 4) {
    const target = getCellByIndex('final-0');
    if (target) {
      target.classList.add('is-predicted');
      return true;
    }
  }

  if (base === 25 && steps >= 2) {
    const target = getCellByIndex('final-0');
    if (target) {
      target.classList.add('is-predicted');
      return true;
    }
  }

  if (base === 26 && steps >= 1) {
    const target = getCellByIndex('final-0');
    if (target) {
      target.classList.add('is-predicted');
      return true;
    }
  }

  const targetBase = base + steps;
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

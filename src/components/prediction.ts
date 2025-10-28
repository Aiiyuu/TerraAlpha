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

function pickupShipEl(scope: HTMLElement | null): HTMLElement | null {
  if (!scope) return null;
  return (
    scope.closest<HTMLElement>('.cell-btn, [data-ship], .ship, button.ship') ||
    scope.querySelector<HTMLElement>('.cell-btn, [data-ship], .ship, button.ship') ||
    null
  );
}

function clearPrediction() {
  document
    .querySelectorAll('.board .is-predicted')
    .forEach((el) => el.classList.remove('is-predicted'));

  document
    .querySelectorAll('.board .ta-bump')
    .forEach((el) => el.closest('.cell-btn')?.classList.remove('ta-bump'));
}


function getQaPrefix(el: HTMLElement): 'p1' | 'p2' | null {
  const qa = el.getAttribute('data-qa') || '';
  const m = qa.match(/^(p[12])-/);
  if (m) return m[1] as 'p1' | 'p2';
  return null;
}

function getShipSide(el: HTMLElement): 'left' | 'right' | null {
  const ds = el.getAttribute('data-side') || el.dataset.side || '';
  if (ds === 'left' || ds === 'right') return ds;
  const pref = getQaPrefix(el);
  if (pref === 'p1') return 'left';
  if (pref === 'p2') return 'right';
  const owner = el.closest<HTMLElement>('#player1, #player2');
  if (owner?.id === 'player1') return 'left';
  if (owner?.id === 'player2') return 'right';
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
  const occ =
    cell.querySelector<HTMLElement>('.ship, [data-role="ship"], button.ship, .cell-btn, [data-ship]') || null;
  if (!occ) return null;
  return { el: occ, side: getShipSide(occ), isMother: isMotherShip(occ) };
}

function isEmpty(cell: HTMLElement | null): boolean {
  return !getCellOccupant(cell);
}

function decideCellMode(
  cell: HTMLElement | null,
  currentSide: 'left' | 'right',
  activeIsMother: boolean,
): { cell: HTMLElement | null; mode: 'normal' | 'replace-own' | 'invalid' } {
  if (!cell) return { cell: null, mode: 'invalid' };
  const occ = getCellOccupant(cell);
  if (!occ) return { cell, mode: 'normal' };
  if (!occ.side) return { cell: null, mode: 'invalid' };
  if (occ.side !== currentSide) return { cell: null, mode: 'invalid' };
  if (activeIsMother && !occ.isMother) return { cell, mode: 'replace-own' };
  return { cell: null, mode: 'invalid' };
}

function selectRedirectCell(
  targetBase: number | string,
  currentSide: 'left' | 'right',
  activeIsMother: boolean,
): { cell: HTMLElement | null; mode: 'normal' | 'replace-own' | 'invalid' } {
  if (String(targetBase) === '27' || String(targetBase) === 'final-0') {
    const f0 = getCellByIndex('final-0');
    return decideCellMode(f0, currentSide, activeIsMother);
  }
  const alts = SPECIAL_REDIRECT[String(targetBase)];
  if (alts) {
    for (const idx of alts) {
      const c = getCellByIndex(idx);
      if (c && isEmpty(c)) return { cell: c, mode: 'normal' };
    }
    if (activeIsMother) {
      for (const idx of alts) {
        const c = getCellByIndex(idx);
        const res = decideCellMode(c, currentSide, activeIsMother);
        if (res.mode === 'replace-own') return res;
      }
    }
    return { cell: null, mode: 'invalid' };
  }
  const c = getCellByIndex(targetBase);
  return decideCellMode(c, currentSide, activeIsMother);
}

function highlightFrom(shipEl: HTMLElement, planned: number | null): boolean {
  clearPrediction();
  if (!Number.isFinite(planned) || (planned as number) <= 0) return false;
  const steps = planned as number;
  const from = getFromPartsIfOnBoard(shipEl);
  const currentSide = getShipSide(shipEl);
  const activeIsMother = isMotherShip(shipEl);
  if (!currentSide) return false;

  if (!from) {
    const pick = selectRedirectCell(steps, currentSide, activeIsMother);
    if (pick.mode === 'normal' && pick.cell) {
      pick.cell.classList.add('is-predicted');
      return true;
    }
    if (pick.mode === 'replace-own' && pick.cell) {
      const occ = getCellOccupant(pick.cell);
      if (occ) occ.el.closest('.cell-btn')?.classList.add('ta-bump');
      return true;
    }
    return false;
  }

  const { base, sub } = from;
  if (base == null) return false;

  if (base === 6 || base === 12 || base === 18) {
    if (sub === '1') {
      if (steps <= 1) return false;
      const targetBase = base + (steps - 1);
      const pick = selectRedirectCell(targetBase, currentSide, activeIsMother);
      if (pick.mode === 'normal' && pick.cell) {
        pick.cell.classList.add('is-predicted');
        return true;
      }
      if (pick.mode === 'replace-own' && pick.cell) {
        const occ = getCellOccupant(pick.cell);
        if (occ) occ.el.classList.add('ta-bump');
        return true;
      }
      return false;
    }
    if (sub === '2') {
      if (steps <= 2) return false;
      const targetBase = base + (steps - 3);
      const pick = selectRedirectCell(targetBase, currentSide, activeIsMother);
      if (pick.mode === 'normal' && pick.cell) {
        pick.cell.classList.add('is-predicted');
        return true;
      }
      if (pick.mode === 'replace-own' && pick.cell) {
        const occ = getCellOccupant(pick.cell);
        if (occ) occ.el.classList.add('ta-bump');
        return true;
      }
      return false;
    }
  }

  if (base === 24) {
    const alts = ['final-2', 'final-1'];
    for (const idx of alts) {
      const c = getCellByIndex(idx);
      if (c && isEmpty(c)) {
        c.classList.add('is-predicted');
        return true;
      }
    }
    if (activeIsMother) {
      for (const idx of alts) {
        const c = getCellByIndex(idx);
        const res = decideCellMode(c, currentSide, activeIsMother);
        if (res.mode === 'replace-own' && c) {
          const occ = getCellOccupant(c);
          if (occ) occ.el.classList.add('ta-bump');
          return true;
        }
      }
    }
    return false;
  }

  if (base === 23 && steps >= 4) {
    const pick = selectRedirectCell('final-0', currentSide, activeIsMother);
    if (pick.mode === 'normal' && pick.cell) {
      pick.cell.classList.add('is-predicted');
      return true;
    }
    if (pick.mode === 'replace-own' && pick.cell) {
      const occ = getCellOccupant(pick.cell);
      if (occ) occ.el.classList.add('ta-bump');
      return true;
    }
    return false;
  }

  if (base === 25 && steps >= 2) {
    const pick = selectRedirectCell('final-0', currentSide, activeIsMother);
    if (pick.mode === 'normal' && pick.cell) {
      pick.cell.classList.add('is-predicted');
      return true;
    }
    if (pick.mode === 'replace-own' && pick.cell) {
      const occ = getCellOccupant(pick.cell);
      if (occ) occ.el.classList.add('ta-bump');
      return true;
    }
    return false;
  }

  if (base === 26 && steps >= 1) {
    const pick = selectRedirectCell('final-0', currentSide, activeIsMother);
    if (pick.mode === 'normal' && pick.cell) {
      pick.cell.classList.add('is-predicted');
      return true;
    }
    if (pick.mode === 'replace-own' && pick.cell) {
      const occ = getCellOccupant(pick.cell);
      if (occ) occ.el.classList.add('ta-bump');
      return true;
    }
    return false;
  }

  const targetBase = base + steps;
  const pick = selectRedirectCell(targetBase, currentSide, activeIsMother);
  if (pick.mode === 'normal' && pick.cell) {
    pick.cell.classList.add('is-predicted');
    return true;
  }
  if (pick.mode === 'replace-own' && pick.cell) {
    const occ = getCellOccupant(pick.cell);
    if (occ) occ.el.classList.add('ta-bump');
    return true;
  }
  return false;
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
      if (ok) {
        shipEl.classList.remove('is-disabled');
        shipEl.removeAttribute('aria-disabled');
        shipEl.removeAttribute('data-prediction-locked');
      } else {
        shipEl.classList.add('is-disabled');
        shipEl.setAttribute('aria-disabled', 'true');
        shipEl.setAttribute('data-prediction-locked', '1');
      }
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
      shipEl.classList.remove('is-disabled');
      shipEl.removeAttribute('aria-disabled');
      shipEl.removeAttribute('data-prediction-locked');
      clearPrediction();
    },
    true,
  );
}

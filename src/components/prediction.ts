import Steps from '../components/stepsButtons';

function getCellByIndex(index: number | string): HTMLElement | null {
  const idx = String(index);
  return (
    document.querySelector<HTMLElement>(`.board [data-qa="field-${idx}"]`) ||
    document.querySelector<HTMLElement>(`.board [data-qa="cell-${idx}"]`) ||
    document.querySelector<HTMLElement>(`.board .cell[data-index="${idx}"]`) ||
    document.getElementById(`field-${idx}`) ||
    document.getElementById(`cell-${idx}`)
  );
}

function parseCellIndex(cell: HTMLElement): number | null {
  const qa = cell.getAttribute('data-qa') || cell.id || cell.getAttribute('data-index') || '';
  const m = qa.match(/(?:^|\s)(?:field|cell)-(\d+)/);
  return m ? Number(m[1]) : null;
}

function getFromFieldIndexIfOnBoard(el: HTMLElement): number | null {
  const parentCell =
    el.closest<HTMLElement>('.board [data-qa^="field-"], .board [data-qa^="cell-"], .board .cell[data-index]');
  if (!parentCell) return null;
  return parseCellIndex(parentCell);
}

function computeTargetIndex(shipEl: HTMLElement, planned: number): number | null {
  if (!Number.isFinite(planned) || planned <= 0) return null;
  const from = getFromFieldIndexIfOnBoard(shipEl);
  return from !== null ? from + planned : planned;
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

function highlightFrom(shipEl: HTMLElement, planned: number | null) {
  clearPrediction();
  if (!Number.isFinite(planned) || (planned as number) <= 0) return;
  const targetIndex = computeTargetIndex(shipEl, planned as number);
  if (!Number.isFinite(targetIndex!)) return;
  const cell = getCellByIndex(targetIndex as number);
  if (!cell) return;
  cell.classList.add('is-predicted');
}

export function setupPrediction() {
  document.addEventListener(
    'pointerover',
    (ev) => {
      const raw = ev.target as HTMLElement;
      const scope = raw?.closest<HTMLElement>('.cell, .cell-btn, [data-ship], .ship, button.ship') || null;
      const shipEl = pickupShipEl(scope);
      if (!shipEl) return;
      const planned = Steps.getStepsForMove();
      highlightFrom(shipEl, planned);
    },
    true,
  );

  document.addEventListener(
    'pointerout',
    (ev) => {
      const fromScope = (ev.target as HTMLElement)?.closest<HTMLElement>(
        '.cell, .cell-btn, [data-ship], .ship, button.ship',
      );
      const to = ev.relatedTarget as HTMLElement | null;
      const toScope = to?.closest('.cell, .cell-btn, [data-ship], .ship, button.ship') as HTMLElement | null;
      if (toScope && toScope === fromScope) return;
      if (toScope) return;
      clearPrediction();
    },
    true,
  );
}

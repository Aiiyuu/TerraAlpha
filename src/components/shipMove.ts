// ShipMove.ts
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

function parseCellIndex(cell: HTMLElement): number | null {
  const qa = cell.getAttribute('data-qa') || cell.id || cell.getAttribute('data-index') || '';
  const m = qa.match(/(?:^|\s)(?:field|cell)-(\d+)/);
  return m ? Number(m[1]) : null;
}

function isOccupied(cell: HTMLElement | null): boolean {
  if (!cell) return false;
  return !!cell.querySelector('.ship, [data-role="ship"], button.ship, .cell-btn');
}

function getPredictedCell(): HTMLElement | null {
  return (
    document.querySelector<HTMLElement>('.board [data-qa^="field-"].is-predicted') ||
    document.querySelector<HTMLElement>('.board [data-qa^="cell-"].is-predicted') ||
    document.querySelector<HTMLElement>('.board .cell.is-predicted')
  );
}

function clearPrediction() {
  document.querySelectorAll('.board .is-predicted').forEach((el) => el.classList.remove('is-predicted'));
}

function disableShipTemporarily(el: HTMLElement, reason: string) {
  if ('disabled' in (el as any)) (el as any).disabled = true;
  el.classList.add('is-disabled');
  el.setAttribute('data-disabled-reason', reason);
  el.setAttribute('aria-disabled', 'true');
  (el as HTMLElement).style.pointerEvents = 'none';
  setTimeout(() => {
    if ('disabled' in (el as any)) (el as any).disabled = false;
    el.classList.remove('is-disabled');
    el.removeAttribute('data-disabled-reason');
    el.removeAttribute('aria-disabled');
    (el as HTMLElement).style.pointerEvents = '';
  }, 400);
}

function resolveTarget(predicted: HTMLElement): HTMLElement | null {
  const base = parseCellIndex(predicted);
  if (base == null) return null;
  const alts = SPECIAL_REDIRECT[String(base)];
  if (!alts) {
    return isOccupied(predicted) ? null : predicted;
  }
  for (const alt of alts) {
    const cell = getCellByIndex(alt);
    if (cell && !isOccupied(cell)) return cell;
  }
  return null;
}

function emitDone(detail: {
  shipQa: string | null;
  fromIndex: number | null;
  toIndex: string;
  usedStep: number;
}) {
  document.dispatchEvent(new CustomEvent('shipmove:done', { detail }));
}

function consumeUsedStep(usedStep: number) {
  const ev = new CustomEvent('steps:consume-current', { detail: { value: usedStep } });
  document.dispatchEvent(ev);
  (Steps as any).consumeCurrent?.();
  (Steps as any).consumeStep?.(usedStep);
}

export function setupShipMove() {
  document.addEventListener(
    'click',
    (ev) => {
      const shipEl = (ev.target as HTMLElement)?.closest<HTMLElement>('.cell-btn, [data-ship], .ship, button.ship');
      if (!shipEl) return;

      const planned = Steps.getStepsForMove();
      if (!Number.isFinite(planned as number) || (planned as number) <= 0) return;

      const predicted = getPredictedCell();
      if (!predicted) return;

      const targetCell = resolveTarget(predicted);
      if (!targetCell) {
        disableShipTemporarily(shipEl, 'blocked');
        return;
      }

      const fromCell =
        shipEl.closest<HTMLElement>('.board [data-qa^="field-"], .board [data-qa^="cell-"], .board .cell[data-index]');
      const fromIndex = fromCell ? parseCellIndex(fromCell) : null;

      clearPrediction();
      targetCell.appendChild(shipEl);

      const shipQa = shipEl.getAttribute('data-qa') || null;
      const toIndex =
        targetCell.getAttribute('data-qa')?.replace(/^(?:field|cell)-/, '') ||
        targetCell.getAttribute('data-index') ||
        '';

      emitDone({
        shipQa,
        fromIndex,
        toIndex,
        usedStep: planned as number,
      });

      consumeUsedStep(planned as number);
    },
    true,
  );
}

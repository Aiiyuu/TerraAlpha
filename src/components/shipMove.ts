import Steps from '../components/stepsButtons';

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

      const planned = Steps.getStepsForMove() as number;
      if (!Number.isFinite(planned) || planned <= 0) return;

      const predicted = getPredictedCell();
      if (!predicted) {
        disableShipTemporarily(shipEl, 'no-prediction');
        return;
      }

      if (isOccupied(predicted)) {
        disableShipTemporarily(shipEl, 'blocked');
        return;
      }

      const fromCell =
        shipEl.closest<HTMLElement>('.board [data-qa^="field-"], .board [data-qa^="cell-"], .board .cell[data-index]');
      const fromIndex = fromCell ? parseCellIndex(fromCell) : null;

      clearPrediction();
      predicted.appendChild(shipEl);

      const shipQa = shipEl.getAttribute('data-qa') || null;
      const toIndex =
        predicted.getAttribute('data-qa')?.replace(/^(?:field|cell)-/, '') ||
        predicted.getAttribute('data-index') ||
        '';

      emitDone({
        shipQa,
        fromIndex,
        toIndex,
        usedStep: planned,
      });

      consumeUsedStep(planned);
    },
    true,
  );
}

import Steps from '../components/stepsButtons';
import { animateShipFinalize } from '../utility/shipsFinalAnimation';
import { runShipReplace } from '../utility/shipReplace';
import { flyShip } from '../components/ShipFly';
import { consumeSteps, getCurrentRoomId } from '../server/server';

type Side = 'left' | 'right';
type MoveKind = 'replaceOwn' | 'overMother' | 'move' | 'finalize';

interface StepsApi {
  getStepsForMove?: () => number | null | undefined;
  getSelectedIndices?: () => number[];
  consumeCurrent?: () => void;
  consumeStep?: (n: number) => void;
}

function parseCellIndex(cell: HTMLElement): number | null {
  const qa = cell.getAttribute('data-qa') || cell.id || cell.getAttribute('data-index') || '';
  const m = qa.match(/(?:^|\s)(?:field|cell)-(\d+)|final-(\d+)/);
  if (!m) return null;
  if (m[2] !== undefined) {
    if (m[2] === '2') return 25;
    if (m[2] === '1') return 26;
    return 27;
  }
  return Number(m[1]);
}

function getShipSide(el: HTMLElement): Side | null {
  const ds = el.getAttribute('data-side') || el.dataset?.side || '';
  if (ds === 'left' || ds === 'right') return ds;
  const qa = el.getAttribute('data-qa') || '';
  const pref = qa.match(/^(p[12])-/)?.[1];
  if (pref === 'p1') return 'left';
  if (pref === 'p2') return 'right';
  if (el.classList.contains('left')) return 'left';
  if (el.classList.contains('right')) return 'right';
  return null;
}

function ensureDataSide(el: HTMLElement) {
  const side = getShipSide(el);
  if (side) el.setAttribute('data-side', side);
}

function isMotherShip(el: HTMLElement): boolean {
  if (!el) return false;
  if (el.matches('[data-role="mother"],[data-ship="mother"],[data-mother="1"],.mother-ship')) return true;
  const qa = el.getAttribute('data-qa') || '';
  if (/-cell-8$/.test(qa)) return true;
  return false;
}

function getCellOccupant(cell: HTMLElement | null): { el: HTMLElement; side: Side | null; isMother: boolean } | null {
  if (!cell) return null;
  const occ =
    cell.querySelector<HTMLElement>('.ship, [data-role="ship"], button.ship, .cell-btn, [data-ship]') || null;
  if (!occ) return null;
  ensureDataSide(occ);
  return { el: occ, side: getShipSide(occ), isMother: isMotherShip(occ) };
}

function getPredictedCell(): HTMLElement | null {
  return (
    document.querySelector<HTMLElement>('.board [data-qa^="field-"].is-predicted') ||
    document.querySelector<HTMLElement>('.board [data-qa^="cell-"].is-predicted') ||
    document.querySelector<HTMLElement>('.board [data-qa^="final-"].is-predicted') ||
    document.querySelector<HTMLElement>('.board .cell.is-predicted')
  );
}

function getReplaceOwnTargetCell(): HTMLElement | null {
  const bumped =
    document.querySelector<HTMLElement>('.board .cell-btn.ta-bump') ||
    document.querySelector<HTMLElement>('.board .ta-bump');
  if (!bumped) return null;
  return bumped.closest<HTMLElement>(
    '.board [data-qa^="field-"], .board [data-qa^="cell-"], .board [data-qa^="final-"], .board .cell[data-index]',
  );
}

function clearPrediction() {
  document.querySelectorAll('.board .is-predicted').forEach((el) => el.classList.remove('is-predicted'));
  document.querySelectorAll('.board .ta-bump').forEach((el) => el.closest('.cell-btn')?.classList.remove('ta-bump'));
}

function hasDisabledProp(el: HTMLElement): el is HTMLButtonElement {
  return el instanceof HTMLButtonElement;
}

function disableShipTemporarily(el: HTMLElement, reason: string) {
  if (hasDisabledProp(el)) el.disabled = true;
  el.classList.add('is-disabled');
  el.setAttribute('data-disabled-reason', reason);
  el.setAttribute('aria-disabled', 'true');
  (el as HTMLElement).style.pointerEvents = 'none';
  setTimeout(() => {
    if (hasDisabledProp(el)) el.disabled = false;
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
  finalizedQa?: string | null;
  finalizedToIndex?: string | null;
  moveKind?: MoveKind;
}) {
  document.dispatchEvent(new CustomEvent('shipmove:done', { detail }));
}

function parseTargetIndex(predicted: HTMLElement): number {
  const qa = predicted.getAttribute('data-qa') || '';
  if (qa === 'final-2') return 25;
  if (qa === 'final-1') return 26;
  if (qa === 'final-0') return 27;
  const m = qa.match(/\d+/)?.[0];
  if (m) return Number(m);
  const di = predicted.getAttribute('data-index');
  if (di && /^\d+$/.test(di)) return Number(di);
  return NaN;
}

function posToIndex(pos: string): number {
  if (pos === 'final-2') return 25;
  if (pos === 'final-1') return 26;
  if (pos === 'final-0') return 27;
  const m = pos.match(/(?:field|cell)-(\d+)/);
  return m ? Number(m[1]) : NaN;
}

function prevIndex(idx: number): number {
  if (idx >= 27) return 26;
  if (idx === 26) return 25;
  if (idx === 25) return 24;
  return Math.max(1, idx - 1);
}

let clickGate = 0;

export function setupShipMove() {
  document.addEventListener(
    'click',
    async (ev) => {
      const now = Date.now();
      if (now - clickGate < 120) return;
      clickGate = now;

      const shipEl = (ev.target as HTMLElement)?.closest<HTMLElement>('.cell-btn, [data-ship], .ship, button.ship');
      if (!shipEl) return;

      ensureDataSide(shipEl);

      const api = Steps as unknown as StepsApi;
      const planned = api.getStepsForMove?.() ?? null;
      const selectedIdx = api.getSelectedIndices?.() ?? [];
      if (!Number.isFinite(planned) || (planned as number) <= 0 || selectedIdx.length === 0) return;

      const predictedNormal = getPredictedCell();
      const predictedReplace = getReplaceOwnTargetCell();
      const predicted = predictedNormal || predictedReplace;
      if (!predicted) {
        disableShipTemporarily(shipEl, 'no-prediction');
        return;
      }

      const fromCell = shipEl.closest<HTMLElement>(
        '.board [data-qa^="field-"], .board [data-qa^="cell-"], .board [data-qa^="final-"], .board .cell[data-index]',
      );
      const fromIndex = fromCell ? parseCellIndex(fromCell) : null;

      const activeSide = getShipSide(shipEl);
      const activeIsMother = isMotherShip(shipEl);
      const occ = getCellOccupant(predicted);

      try {
        await consumeSteps(getCurrentRoomId(), selectedIdx);
        api.consumeCurrent?.();
      } catch {
        return;
      }

      if (occ) {
        if (!activeSide || !occ.side || occ.side !== activeSide) {
          disableShipTemporarily(shipEl, 'blocked');
          return;
        }

        if (activeIsMother && !occ.isMother) {
          clearPrediction();
          const outBtn = (occ.el.closest('.cell-btn') || occ.el) as HTMLElement;
          ensureDataSide(outBtn);
          ensureDataSide(shipEl);

          const shipQa = shipEl.getAttribute('data-qa') || null;
          const toIndex = predicted.getAttribute('data-qa') || predicted.getAttribute('data-index') || '';

          emitDone({
            shipQa,
            fromIndex,
            toIndex,
            usedStep: planned as number,
            finalizedQa: outBtn.getAttribute('data-qa') || null,
            finalizedToIndex: 'final-0',
            moveKind: 'replaceOwn',
          });

          await runShipReplace({
            cellEl: predicted,
            outBtn,
            motherBtn: shipEl,
            spinMs: 500,
            popMs: 180,
          });

          if (predicted.getAttribute('data-qa') === 'final-0') {
            animateShipFinalize(shipEl, shipQa);
          }

          return;
        }

        if (!activeIsMother && occ.isMother) {
          clearPrediction();

          const shipQa = shipEl.getAttribute('data-qa') || null;
          const toQa = predicted.getAttribute('data-qa') || predicted.getAttribute('data-index') || '';
          const toIndexNum = posToIndex(toQa);
          const prevIdx = prevIndex(toIndexNum);

          if (fromIndex == null || prevIdx > fromIndex) {
            await flyShip({ shipEl, fromIndex, to: prevIdx, stepMs: 160, hideOriginal: false });
          }

          emitDone({
            shipQa,
            fromIndex,
            toIndex: toQa,
            usedStep: planned as number,
            finalizedQa: shipQa,
            finalizedToIndex: 'final-0',
            moveKind: 'overMother',
          });

          await (async function runSimpleOverMother(cellEl: HTMLElement, simpleBtn: HTMLElement) {
            ensureDataSide(simpleBtn);
            const motherBtn = cellEl.querySelector<HTMLElement>('.cell-btn');
            motherBtn?.classList.remove('ta-bump');
            simpleBtn.classList.add('is-overlay', 'over-spin');
            ensureDataSide(motherBtn || simpleBtn);
            cellEl.appendChild(simpleBtn);
            await new Promise<void>((resolve) => {
              let done = false;
              const onEnd = () => {
                if (done) return;
                done = true;
                simpleBtn.removeEventListener('animationend', onEnd);
                resolve();
              };
              simpleBtn.addEventListener('animationend', onEnd, { once: true });
              setTimeout(onEnd, 350);
            });
            simpleBtn.remove();
          })(predicted, shipEl);

          return;
        }

        disableShipTemporarily(shipEl, 'blocked');
        return;
      }

      clearPrediction();
      ensureDataSide(shipEl);

      const toIndexNum = parseTargetIndex(predicted);

      await flyShip({ shipEl, fromIndex, to: toIndexNum, stepMs: 160 });

      predicted.appendChild(shipEl);

      const shipQa = shipEl.getAttribute('data-qa') || null;
      const toIndex = predicted.getAttribute('data-qa') || predicted.getAttribute('data-index') || '';

      emitDone({
        shipQa,
        fromIndex,
        toIndex,
        usedStep: planned as number,
        moveKind: toIndex === 'final-0' ? 'finalize' : 'move',
      });

      if (predicted.getAttribute('data-qa') === 'final-0') {
        animateShipFinalize(shipEl, shipQa);
      }
    },
    true,
  );
}

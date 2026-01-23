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

type ShipMoveDetail = {
  shipQa: string | null;
  fromIndex: number | null;
  toIndex: string;
  usedStep: number;
  finalizedQa?: string | null;
  finalizedToIndex?: string | null;
  moveKind?: MoveKind;
};

const SELECTORS = {
  boardCellAny: '.board [data-qa^="field-"], .board [data-qa^="cell-"], .board [data-qa^="final-"], .board .cell[data-index]',
  shipAny: '.ship, [data-role="ship"], button.ship, .cell-btn, [data-ship]',
  predicted:
    '.board [data-qa^="field-"].is-predicted, .board [data-qa^="cell-"].is-predicted, .board [data-qa^="final-"].is-predicted, .board .cell.is-predicted',
  bump: '.board .cell-btn.ta-bump, .board .ta-bump',
};

const FINAL_IDX: Record<string, number> = { 'final-2': 25, 'final-1': 26, 'final-0': 27 };
const ANIM = { stepMs: 160, replaceSpinMs: 500, replacePopMs: 180 };

function parseIndexFromQa(qa: string | null): number | null {
  if (!qa) return null;
  if (qa in FINAL_IDX) return FINAL_IDX[qa];
  const m = qa.match(/(?:^|\s)(?:field|cell)-(\d+)/)?.[1] || qa.match(/\d+/)?.[0];
  return m ? Number(m) : null;
}

function parseIndexFromEl(cell: HTMLElement | null): number | null {
  if (!cell) return null;
  const qa = cell.getAttribute('data-qa') || cell.getAttribute('data-index') || '';
  const byQa = parseIndexFromQa(qa);
  if (byQa != null) return byQa;
  const di = cell.getAttribute('data-index');
  return di && /^\d+$/.test(di) ? Number(di) : null;
}

function prevIndex(idx: number): number {
  if (idx >= 27) return 26;
  if (idx === 26) return 25;
  if (idx === 25) return 24;
  return Math.max(1, idx - 1);
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
  return /-cell-8$/.test(qa);
}

function getCellOccupant(cell: HTMLElement | null) {
  if (!cell) return null;
  const occ = cell.querySelector<HTMLElement>(SELECTORS.shipAny);
  if (!occ) return null;
  ensureDataSide(occ);
  return { el: occ, side: getShipSide(occ), isMother: isMotherShip(occ) };
}

function getPredictedCell(): HTMLElement | null {
  return document.querySelector<HTMLElement>(SELECTORS.predicted);
}

function getReplaceOwnTargetCell(): HTMLElement | null {
  const bumped = document.querySelector<HTMLElement>(SELECTORS.bump);
  if (!bumped) return null;
  return bumped.closest<HTMLElement>(SELECTORS.boardCellAny);
}

function clearPrediction() {
  document.querySelectorAll('.board .is-predicted').forEach((el) => el.classList.remove('is-predicted'));
  document.querySelectorAll('.board .ta-bump').forEach((el) => el.closest('.cell-btn')?.classList.remove('ta-bump'));
}

function setDisabled(el: HTMLElement, v: boolean, reason?: string) {
  if (el instanceof HTMLButtonElement) el.disabled = v;
  el.classList.toggle('is-disabled', v);
  if (v && reason) el.setAttribute('data-disabled-reason', reason);
  else el.removeAttribute('data-disabled-reason');
  el.setAttribute('aria-disabled', String(v));
}

function disableShipTemporarily(el: HTMLElement, reason: string) {
  setDisabled(el, true, reason);
  setTimeout(() => setDisabled(el, false), 400);
}

function emitDone(detail: ShipMoveDetail) {
  document.dispatchEvent(new CustomEvent('shipmove:done', { detail }));
}

let clickGate = 0;
let installed = false;

export function setupShipMove() {
  if (installed) return;
  installed = true;

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

      const fromCell = shipEl.closest<HTMLElement>(SELECTORS.boardCellAny);
      const fromIndex = parseIndexFromEl(fromCell);
      const activeSide = getShipSide(shipEl);
      const activeIsMother = isMotherShip(shipEl);
      const occ = getCellOccupant(predicted);

      if (occ) {
        if (!activeSide || !occ.side || occ.side !== activeSide) {
          disableShipTemporarily(shipEl, 'blocked');
          return;
        }

        if (activeIsMother && !occ.isMother) {
          try {
            await consumeSteps(getCurrentRoomId(), selectedIdx);
            api.consumeCurrent?.();
          } catch {
            return;
          }

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
            spinMs: ANIM.replaceSpinMs,
            popMs: ANIM.replacePopMs,
          });

          if (predicted.getAttribute('data-qa') === 'final-0') {
            animateShipFinalize(shipEl, shipQa);
          }

          return;
        }

        if (!activeIsMother && occ.isMother) {
          const toQa = predicted.getAttribute('data-qa') || predicted.getAttribute('data-index') || '';
          const toIndexNum = parseIndexFromQa(toQa) ?? NaN;
          const prevIdx = prevIndex(toIndexNum);

          if (fromIndex == null || prevIdx > fromIndex) {
            try {
              await consumeSteps(getCurrentRoomId(), selectedIdx);
              api.consumeCurrent?.();
            } catch {
              return;
            }

            await flyShip({ shipEl, fromIndex, to: prevIdx, stepMs: ANIM.stepMs, hideOriginal: false });
          } else {
            try {
              await consumeSteps(getCurrentRoomId(), selectedIdx);
              api.consumeCurrent?.();
            } catch {
              return;
            }
          }

          const shipQa = shipEl.getAttribute('data-qa') || null;

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

          clearPrediction();
          return;
        }

        disableShipTemporarily(shipEl, 'blocked');
        return;
      }

      try {
        await consumeSteps(getCurrentRoomId(), selectedIdx);
        api.consumeCurrent?.();
      } catch {
        return;
      }

      clearPrediction();
      ensureDataSide(shipEl);

      const toIndexNum = parseIndexFromEl(predicted) ?? NaN;
      await flyShip({ shipEl, fromIndex, to: toIndexNum, stepMs: ANIM.stepMs });

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

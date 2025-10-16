import { hideAllSteps, clearPlanned, getPlannedMove } from '../components/steps.ts';
import type { PlayerColor } from '../components/forecast.ts';
import { gameState } from '../components/state.ts';

let getActiveColorRef: () => PlayerColor = () => 'red';

function getCellByQa(qa: string): HTMLElement | null {
  return document.querySelector<HTMLElement>(`.board [data-qa="${qa}"]`);
}

function getParentCell(el: HTMLElement): HTMLElement | null {
  return el.closest<HTMLElement>('.board .cell');
}

function getQa(el: HTMLElement | null | undefined): string | null {
  return el?.getAttribute('data-qa') ?? null;
}

function getShipId(el: HTMLElement | null | undefined): string | null {
  return el?.getAttribute('data-ship-id') ?? null;
}

function getShipColor(el: HTMLElement): PlayerColor | null {
  const qa = el.getAttribute('data-qa') || '';
  if (qa.startsWith('p1-')) return 'red';
  if (qa.startsWith('p2-')) return 'blue';
  if (el.closest('#player1, .player1')) return 'red';
  if (el.closest('#player2, .player2')) return 'blue';
  return null;
}

function isMotherShip(el: HTMLElement): boolean {
  return (
    el.getAttribute('data-ship') === 'mother' ||
    el.classList.contains('ship--mother') ||
    el.classList.contains('is-mother') ||
    /p1-cell-8|p2-cell-8/.test(el.getAttribute('data-qa') || '')
  );
}

function domMoveShipToTarget(shipEl: HTMLElement, targetQa: string) {
  const targetCell = getCellByQa(targetQa);
  if (!targetCell) return;
  shipEl.remove();
  targetCell.appendChild(shipEl);
}

function removeShipContainer(el: HTMLElement | null) {
  const container = el?.closest<HTMLElement>('.cell-btn, [data-ship], .ship') || null;
  container?.remove();
}

function updateStateMove(shipEl: HTMLElement, targetQa: string) {
  const shipId = getShipId(shipEl);
  if (!shipId) return;
  const to =
    targetQa === 'final-0' ? { type: 'final', lane: 0 as const }
    : targetQa === 'final-1' ? { type: 'final', lane: 1 as const }
    : targetQa === 'final-2' ? { type: 'final', lane: 2 as const }
    : { type: 'board', cell: targetQa as string };
  gameState.moveShip(shipId, to as any);
}

function finishMoveAndPassTurn(color: PlayerColor) {
  clearPlanned(color);
  hideAllSteps();
  document.dispatchEvent(new CustomEvent('board:changed'));
  const nextColor: PlayerColor = color === 'red' ? 'blue' : 'red';
  gameState.setTurn(nextColor);
  document.dispatchEvent(new CustomEvent('turn:change', { detail: { color: nextColor } }));
}

export function setupMoveShips(getActiveColor: () => PlayerColor) {
  getActiveColorRef = getActiveColor;

  document.addEventListener('move:execute', (e: Event) => {
    const { color, shipQa, targetQa } = (e as CustomEvent).detail as {
      color: PlayerColor;
      shipQa: string;
      targetQa: string;
    };

    if (color !== getActiveColorRef()) return;

    const shipEl =
      document.querySelector<HTMLElement>(`.cell-btn[data-qa="${shipQa}"]`) ||
      document.querySelector<HTMLElement>(`[data-qa="${shipQa}"]`);
    if (!shipEl) return;

    const targetCell = getCellByQa(targetQa);
    const occupant =
      targetCell?.querySelector<HTMLElement>('.cell-btn, [data-ship], .ship') ?? null;

    if (occupant && getShipColor(occupant) === getShipColor(shipEl)) {
      removeShipContainer(occupant);
    }

    updateStateMove(shipEl, targetQa);
    domMoveShipToTarget(shipEl, targetQa);
    finishMoveAndPassTurn(color);
  });

  document.addEventListener(
    'click',
    ev => {
      const target = (ev.target as HTMLElement)?.closest<HTMLElement>('.cell-btn, [data-ship], .ship');
      if (!target) return;

      const color = getShipColor(target) ?? getActiveColorRef();
      if (color !== getActiveColorRef()) return;

      if (!isMotherShip(target)) return;

      const planned = getPlannedMove(getActiveColorRef());
      if (!Number.isFinite(planned) || (planned as number) <= 0) return;

      const mergeTargetShip =
        document.querySelector<HTMLElement>('.board .ship-merge-vibrate') || null;

      if (mergeTargetShip) {
        const sameSide = getShipColor(mergeTargetShip) === color;
        const cell = sameSide ? getParentCell(mergeTargetShip) : null;
        const cellQa = getQa(cell);

        if (sameSide && cell && cellQa) {
          removeShipContainer(mergeTargetShip);
          updateStateMove(target, cellQa);
          domMoveShipToTarget(target, cellQa);
          finishMoveAndPassTurn(color);
          return;
        }
      }

      const forecastCell = document.querySelector<HTMLElement>('.board .cell.is-forecast') || null;
      const forecastQa = getQa(forecastCell);

      if (forecastCell && forecastQa) {
        const occ = forecastCell.querySelector<HTMLElement>('.cell-btn, [data-ship], .ship') ?? null;
        if (occ && getShipColor(occ) === color) {
          removeShipContainer(occ);
        }
        updateStateMove(target, forecastQa);
        domMoveShipToTarget(target, forecastQa);
        finishMoveAndPassTurn(color);
        return;
      }
    },
    true
  );
}

export function setActivePlayer(color: PlayerColor) {
  getActiveColorRef = () => color;
  gameState.setTurn(color);
}

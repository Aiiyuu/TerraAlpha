import { hideAllSteps, clearPlanned } from '../components/steps.ts';
import type { PlayerColor } from '../components/forecast.ts';

let getActiveColorRef: () => PlayerColor = () => 'red';

function getCellByQa(qa: string): HTMLElement | null {
  return document.querySelector<HTMLElement>(`[data-qa="${qa}"]`);
}

function moveShipToTarget(shipEl: HTMLElement, targetQa: string) {
  const targetCell = getCellByQa(targetQa);
  if (!targetCell) return;

  const currentParent = shipEl.parentElement;
  if (currentParent) currentParent.removeChild(shipEl);

  targetCell.appendChild(shipEl);
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

    moveShipToTarget(shipEl, targetQa);

    clearPlanned(color);
    hideAllSteps();

    document.dispatchEvent(new CustomEvent('board:changed'));

    const nextColor: PlayerColor = color === 'red' ? 'blue' : 'red';
    document.dispatchEvent(new CustomEvent('turn:change', { detail: { color: nextColor } }));
  });
}

export function setActivePlayer(color: PlayerColor) {
  getActiveColorRef = () => color;
}

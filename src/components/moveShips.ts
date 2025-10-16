import { hideAllSteps, clearPlanned, getPlannedMove } from '../components/steps.ts';
import type { PlayerColor } from '../components/forecast.ts';

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

function moveShipToTarget(shipEl: HTMLElement, targetQa: string) {
  const targetCell = getCellByQa(targetQa);
  if (!targetCell) return;

  shipEl.remove(); // прибираємо з поточного батька
  targetCell.appendChild(shipEl);
}

function removeShipContainer(el: HTMLElement | null) {
  const container = el?.closest<HTMLElement>('.cell-btn, [data-ship], .ship') || null;
  container?.remove();
}

function finishMoveAndPassTurn(color: PlayerColor) {
  clearPlanned(color);
  hideAllSteps();

  document.dispatchEvent(new CustomEvent('board:changed'));

  const nextColor: PlayerColor = color === 'red' ? 'blue' : 'red';
  document.dispatchEvent(new CustomEvent('turn:change', { detail: { color: nextColor } }));
}

export function setupMoveShips(getActiveColor: () => PlayerColor) {
  getActiveColorRef = getActiveColor;

  // 1) Існуючий імперативний сценарій через подію move:execute
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

    // якщо в цілі свій корабель — це мердж: видаляємо КОНТЕЙНЕР
    if (occupant && getShipColor(occupant) === getShipColor(shipEl)) {
      removeShipContainer(occupant);
    }

    moveShipToTarget(shipEl, targetQa);
    finishMoveAndPassTurn(color);
  });

  // 2) Новий сценарій: клік по МАТЕРИНСЬКОМУ кораблю → рух у прогнозовану клітинку
  document.addEventListener(
    'click',
    ev => {
      const target = (ev.target as HTMLElement)?.closest<HTMLElement>('.cell-btn, [data-ship], .ship');
      if (!target) return;

      // лише активний гравець
      const color = getShipColor(target) ?? getActiveColorRef();
      if (color !== getActiveColorRef()) return;

      // працюємо лише з материнським кораблем
      if (!isMotherShip(target)) return;

      // має бути запланований крок
      const planned = getPlannedMove(getActiveColorRef());
      if (!Number.isFinite(planned) || (planned as number) <= 0) return;

      // A) Мердж-сценарій: forecast позначив дружній корабель у цілі класом .ship-merge-vibrate
      const mergeTargetShip =
        document.querySelector<HTMLElement>('.board .ship-merge-vibrate') || null;

      if (mergeTargetShip) {
        const sameSide = getShipColor(mergeTargetShip) === color;
        const cell = sameSide ? getParentCell(mergeTargetShip) : null;
        const cellQa = getQa(cell);

        if (sameSide && cell && cellQa) {
          // Видаляємо КОНТЕЙНЕР дружнього корабля і переносимо материнський
          removeShipContainer(mergeTargetShip);
          moveShipToTarget(target, cellQa);
          finishMoveAndPassTurn(color);
          return;
        }
      }

      // B) Звичайний сценарій: є підсвітка .is-forecast на клітинці
      const forecastCell = document.querySelector<HTMLElement>('.board .cell.is-forecast') || null;
      const forecastQa = getQa(forecastCell);

      if (forecastCell && forecastQa) {
        // На всяк випадок: якщо раптово в клітинці вже стоїть свій — теж мерджимо (видаляємо КОНТЕЙНЕР)
        const occ = forecastCell.querySelector<HTMLElement>('.cell-btn, [data-ship], .ship') ?? null;
        if (occ && getShipColor(occ) === color) {
          removeShipContainer(occ);
        }

        moveShipToTarget(target, forecastQa);
        finishMoveAndPassTurn(color);
        return;
      }

      // якщо прогнозу немає — ігноруємо клік
    },
    true
  );
}

export function setActivePlayer(color: PlayerColor) {
  getActiveColorRef = () => color;
}

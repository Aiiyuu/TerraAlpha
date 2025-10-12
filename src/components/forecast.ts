// src/components/forecast.ts
import { getPlannedMove } from './steps.ts';

export type PlayerColor = 'red' | 'blue';

let lastHighlighted: HTMLElement | null = null;
let currentPlanned: number | null = null;
let activeColor: PlayerColor = 'red'; // оновлюємо з moveShips (див. setup нижче)

function clearForecast() {
  if (lastHighlighted) {
    lastHighlighted.classList.remove('is-forecast');
    lastHighlighted = null;
  }
}

/** Знаходимо клітинку поля за індексом (field-<n>) */
function getFieldCellByIndex(index: number): HTMLElement | null {
  if (!Number.isFinite(index) || index <= 0) return null;
  return document.querySelector<HTMLElement>(`[data-qa="field-${index}"]`);
}

/** Чи корабель у "руці" (панелі стартових фішок) */
function isInHand(el: HTMLElement): boolean {
  return !!el.closest('.hand-grid');
}

/** Підсвітити прогноз для конкретного корабля */
function highlightForecastForShip(shipEl: HTMLElement, color: PlayerColor) {
  clearForecast();
  if (!currentPlanned || currentPlanned <= 0) return;

  let targetIndex: number | null = null;

  if (isInHand(shipEl)) {
    // кейс з ТЗ: корабель у руці -> просто field-<planned>
    targetIndex = currentPlanned;
  } else {
    // якщо корабель вже на полі — спробуємо зчитати його поточний індекс з батьківського поля
    // очікуємо що контейнер має data-qa="field-<n>"
    const field = shipEl.closest<HTMLElement>('[data-qa^="field-"]');
    if (!field) return;
    const qa = field.getAttribute('data-qa') || '';
    const m = qa.match(/field-(\d+)/);
    const from = m ? Number(m[1]) : NaN;
    if (!Number.isFinite(from)) return;
    targetIndex = from + currentPlanned;
  }

  if (!targetIndex) return;
  const cell = getFieldCellByIndex(targetIndex);
  if (!cell) return;

  cell.classList.add('is-forecast');
  lastHighlighted = cell;
}

/** Публічна ініціалізація: викликати один раз при старті гри */
export function setupForecast(getActiveColor: () => PlayerColor) {
  // збережемо спосіб дізнатись активний колір
  activeColor = getActiveColor();

  // 1) слухаємо зміну planned з steps.ts
  document.addEventListener('steps:planned-change', (e: Event) => {
    const { color, planned } = (e as CustomEvent).detail as {
      color: PlayerColor; planned: number | null;
    };
    // оновлюємо тільки для активного кольору (щоб чужі дії не впливали)
    if (color !== getActiveColor()) return;
    currentPlanned = planned;
    // перерахунок прогнозу на поточному фокусі (якщо є)
    const focused = document.activeElement as HTMLElement | null;
    if (focused && (focused.matches('.hand-grid .cell-btn, [data-ship], .ship'))) {
      highlightForecastForShip(focused, color);
    } else {
      clearForecast();
    }
  });

  // 2) делегуємо фокус/ховер на кораблі
  document.addEventListener('focusin', (e) => {
    const el = (e.target as HTMLElement)?.closest<HTMLElement>('.hand-grid .cell-btn, [data-ship], .ship');
    if (!el) return;
    const color: PlayerColor =
      el.closest('#player1, .player1') ? 'red' :
      el.closest('#player2, .player2') ? 'blue' : activeColor;

    // фокусимо тільки активного гравця
    if (color !== getActiveColor()) return;

    // беремо останній planned напряму (на випадок, якщо події ще не прийшли)
    currentPlanned = getPlannedMove(getActiveColor());
    highlightForecastForShip(el, color);
  });

  document.addEventListener('mouseover', (e) => {
    const el = (e.target as HTMLElement)?.closest<HTMLElement>('.hand-grid .cell-btn, [data-ship], .ship');
    if (!el) return;
    const color: PlayerColor =
      el.closest('#player1, .player1') ? 'red' :
      el.closest('#player2, .player2') ? 'blue' : activeColor;
    if (color !== getActiveColor()) return;

    currentPlanned = getPlannedMove(getActiveColor());
    highlightForecastForShip(el, color);
  });

  // 3) очищення при втраті фокуса / виході курсора
  document.addEventListener('focusout', () => clearForecast());
  document.addEventListener('mouseout', (e) => {
    const rel = (e as MouseEvent).relatedTarget as HTMLElement | null;
    if (!rel || !rel.closest('.hand-grid, [data-ship], .ship')) {
      clearForecast();
    }
  });
}

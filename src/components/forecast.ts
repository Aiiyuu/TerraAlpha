import { getPlannedMove } from './steps.ts';

export type PlayerColor = 'red' | 'blue';

let lastHighlighted: HTMLElement | null = null;
let currentPlanned: number | null = null;
let lastFocusedShipEl: HTMLElement | null = null;
let getActiveColorRef: () => PlayerColor = () => 'red';

/* ================== DISABLE/ENABLE з причинами ==================
   Використовуємо дві незалежні причини блокування:
   - disabledByTurn: корабель вимкнений, бо не його черга
   - disabledByForecast: тимчасово вимкнений через зайняту ціль прогнозу
   Розблокування певної причини не чіпає іншу.
================================================================= */
type DisableReason = 'disabledByTurn' | 'disabledByForecast';

function applyDisabled(el: HTMLElement, reason: DisableReason) {
  if (el.dataset[reason] === '1') return;
  el.dataset[reason] = '1';
  el.classList.add('is-disabled');

  if (el instanceof HTMLButtonElement) {
    el.disabled = true;
    el.setAttribute('tabindex', '-1');
    el.setAttribute('aria-disabled', 'true');
  } else {
    (el.style as any).pointerEvents = 'none';
    el.setAttribute('aria-disabled', 'true');
  }
}

function clearDisabled(el: HTMLElement | null, reason: DisableReason) {
  if (!el) return;
  if (el.dataset[reason] !== '1') return;

  delete el.dataset[reason];

  // якщо більше НІЯКОЇ причини не лишилось — повністю вмикаємо
  const stillDisabled =
    el.dataset.disabledByTurn === '1' || el.dataset.disabledByForecast === '1';

  if (!stillDisabled) {
    el.classList.remove('is-disabled');

    if (el instanceof HTMLButtonElement) {
      el.disabled = false;
      el.removeAttribute('tabindex');
      el.removeAttribute('aria-disabled');
    } else {
      (el.style as any).pointerEvents = '';
      el.removeAttribute('aria-disabled');
    }
  }
}

/* ================== forecast utils ================== */
function clearForecast() {
  if (lastHighlighted) {
    lastHighlighted.classList.remove('is-forecast');
    lastHighlighted = null;
  }
  // знімаємо лише блокування, пов’язане з ПРОГНОЗОМ
  clearDisabled(lastFocusedShipEl, 'disabledByForecast');
}

function getFieldCellByIndex(index: number): HTMLElement | null {
  if (!Number.isFinite(index) || index <= 0) return null;
  return document.querySelector<HTMLElement>(`.board [data-qa="field-${index}"]`);
}

function parseFieldQa(qa: string | null): number | null {
  if (!qa) return null;
  const m = qa.match(/^field-(\d+)$/);
  return m ? Number(m[1]) : null;
}

function getShipColor(el: HTMLElement): PlayerColor | null {
  const qa = el.getAttribute('data-qa') || '';
  if (qa.startsWith('p1-cell-')) return 'red';
  if (qa.startsWith('p2-cell-')) return 'blue';
  if (el.closest('#player1, .player1')) return 'red';
  if (el.closest('#player2, .player2')) return 'blue';
  return null;
}

function isShipEl(el: HTMLElement | null): boolean {
  return !!el?.closest?.('.cell-btn, [data-ship], .ship');
}

function getFromFieldIndexIfOnBoard(el: HTMLElement): number | null {
  const parentCell = el.closest<HTMLElement>('.board .cell');
  if (!parentCell) return null;
  return parseFieldQa(parentCell.getAttribute('data-qa'));
}

function computeTargetIndex(shipEl: HTMLElement, planned: number): number | null {
  if (!Number.isFinite(planned) || planned <= 0) return null;
  const fromOnBoard = getFromFieldIndexIfOnBoard(shipEl);
  return fromOnBoard !== null ? fromOnBoard + planned : planned;
}

function targetHasButton(cell: HTMLElement): boolean {
  // зайнята, якщо в середині є кнопка/корабель
  return !!cell.querySelector('.cell-btn, button, [data-ship], .ship');
}

/* ============ головна логіка підсвітки під час ФОКУСУ ============ */
function highlightForecastForShip(shipEl: HTMLElement, color: PlayerColor, planned: number | null) {
  clearForecast();
  if (!Number.isFinite(planned) || (planned as number) <= 0) return;

  const targetIndex = computeTargetIndex(shipEl, planned as number);
  if (!Number.isFinite(targetIndex!)) return;

  const cell = getFieldCellByIndex(targetIndex as number);
  if (!cell) return;

  // 1) Спочатку перевіряємо зайнятість
  if (targetHasButton(cell)) {
    // зайнято → НЕ підсвічуємо, а корабель тимчасово блокуємо через прогноз
    applyDisabled(shipEl, 'disabledByForecast');
    return;
  }

  // 2) Вільно → повертаємо інтерактив (якщо блокували прогнозом) і підсвічуємо
  clearDisabled(shipEl, 'disabledByForecast');
  cell.classList.add('is-forecast');
  lastHighlighted = cell;
}

/* ====== Увімкнути лише кораблі активного кольору, інші вимкнути ====== */
function enforceTurnInteractivity() {
  const active = getActiveColorRef();
  const ships = document.querySelectorAll<HTMLElement>('.cell-btn, [data-ship], .ship');

  ships.forEach(el => {
    const color = getShipColor(el);
    if (!color) return;

    if (color === active) {
      // знімаємо блокування по причині "черга"
      clearDisabled(el, 'disabledByTurn');
    } else {
      // блокуємо по причині "черга"
      applyDisabled(el, 'disabledByTurn');
    }
  });
}

/* ================== setup ================== */
export function setupForecast(getActiveColor: () => PlayerColor) {
  getActiveColorRef = getActiveColor;

  // Початкове застосування правил черги
  enforceTurnInteractivity();

  // Зміна запланованих кроків
  document.addEventListener('steps:planned-change', (e: Event) => {
    const { color, planned } = (e as CustomEvent).detail as {
      color: PlayerColor; planned: number | null;
    };

    // На всяк випадок тримаємо інтерфейс у правильному стані за чергою
    enforceTurnInteractivity();

    if (color !== getActiveColorRef()) return;

    currentPlanned = planned;

    if (lastFocusedShipEl) {
      const shipColor = getShipColor(lastFocusedShipEl);
      if (shipColor && shipColor === color) {
        highlightForecastForShip(lastFocusedShipEl, color, currentPlanned);
        return;
      }
    }

    clearForecast();
  });

  // Запит на показ прогнозу ззовні
  document.addEventListener('steps:request-forecast', (e: Event) => {
    const { color, planned, shipQa, fromCellQa } = (e as CustomEvent).detail as {
      color: PlayerColor;
      planned: number;
      shipQa?: string | null;
      fromCellQa?: string | null;
    };

    enforceTurnInteractivity();

    if (color !== getActiveColorRef()) return;

    let shipEl: HTMLElement | null = null;
    if (shipQa) shipEl = document.querySelector<HTMLElement>(`.cell-btn[data-qa="${shipQa}"]`);
    if (!shipEl) shipEl = lastFocusedShipEl;

    if (!Number.isFinite(planned) || planned <= 0) {
      clearForecast();
      return;
    }

    if (fromCellQa) {
      clearForecast();
      const from = parseFieldQa(fromCellQa);
      if (from !== null) {
        const target = from + planned;
        const cell = getFieldCellByIndex(target);
        if (cell) {
          // 1) Перевіряємо зайнятість
          if (shipEl && targetHasButton(cell)) {
            applyDisabled(shipEl, 'disabledByForecast');
            return; // нічого не підсвічуємо
          }

          // 2) Вільно → дозволяємо інтерактив (по прогнозу) і підсвічуємо
          if (shipEl) clearDisabled(shipEl, 'disabledByForecast');
          cell.classList.add('is-forecast');
          lastHighlighted = cell;
        }
      }
      return;
    }

    if (shipEl) {
      highlightForecastForShip(shipEl, color, planned);
    }
  });

  /* ================== ФОКУС (замість ховеру) ================== */
  document.addEventListener('focusin', (ev) => {
    enforceTurnInteractivity();

    const el = (ev.target as HTMLElement)?.closest<HTMLElement>('.cell-btn, [data-ship], .ship');
    if (!el) return;

    const color = getShipColor(el) ?? getActiveColorRef();
    if (color !== getActiveColorRef()) {
      // якщо випадково фокус став на чужий корабель — одразу знімаємо підсвітку
      clearForecast();
      return;
    }

    lastFocusedShipEl = el;
    const planned = getPlannedMove(getActiveColorRef());
    currentPlanned = planned;
    highlightForecastForShip(el, color, planned);
  }, true);

  document.addEventListener('focusout', (ev) => {
    const next = ev.relatedTarget as HTMLElement | null;
    if (next && (next.closest('.hand-grid') || next.closest('.board') || isShipEl(next))) return;

    lastFocusedShipEl = null;
    clearForecast();

    enforceTurnInteractivity();
  }, true);

}

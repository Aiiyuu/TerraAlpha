// src/components/moveShips.ts
export type PlayerColor = 'red' | 'blue';

let activeColor: PlayerColor = 'red';

// Універсальний пошук
function qsa<T extends Element = Element>(sel: string, root: ParentNode = document) {
  return Array.from(root.querySelectorAll<T>(sel));
}

// ❗️ГОЛОВНЕ: підлаштовано під твою верстку (#player1/#player2 .hand-grid .cell-btn)
function getShips(color: PlayerColor): HTMLElement[] {
  const byData = qsa<HTMLElement>(`[data-ship][data-color="${color}"]`);
  const byId = qsa<HTMLElement>(
    `${color === 'red' ? '#player1' : '#player2'} .hand-grid .cell-btn`
  );
  const byClass = qsa<HTMLElement>(
    `${color === 'red' ? '.player1' : '.player2'} .hand-grid .cell-btn`
  );
  // Унікальний набір
  return [...new Set([...byData, ...byId, ...byClass])];
}

function applyShipEnabledState(ships: HTMLElement[], enabled: boolean) {
  ships.forEach((el) => {
    // основний “вимикач”
    el.classList.toggle('is-disabled', !enabled);
    // доступність/фокус
    el.setAttribute('aria-disabled', (!enabled).toString());
    el.setAttribute('tabindex', enabled ? '0' : '-1');
    // додатковий флаг
    el.dataset.enabled = String(enabled);
    // курсор для UX
    if (!enabled) el.style.cursor = 'not-allowed';
    else el.style.removeProperty('cursor');
  });
}

/** Публічне: вмикає/вимикає усі кораблі певного кольору */
export function setShipsEnabled(color: PlayerColor, enabled: boolean) {
  applyShipEnabledState(getShips(color), enabled);
}

/** Публічне: встановлює активного гравця (увімкнути його кораблі, виключити опонента) */
export function setActivePlayer(color: PlayerColor) {
  activeColor = color;
  const opponent: PlayerColor = color === 'red' ? 'blue' : 'red';
  setShipsEnabled(color, true);
  setShipsEnabled(opponent, false);
  // для дебагу/стилів можна підглянути поточний колір
  document.documentElement.dataset.activeColor = color;
}

/**
 * (Опційно) Під'єднати глобальну взаємодію з кораблями
 * Викликати 1 раз під час ініціалізації.
 */
export function setupShipInteractivity(
  onShipClick: (el: HTMLElement, color: PlayerColor) => void
) {
  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement)?.closest<HTMLElement>(
      // враховуємо твою розмітку + можливі data-атрибути
      '[data-ship], .ship, .hand-grid .cell-btn'
    );
    if (!el) return;

    // Якщо вимкнено — ігноруємо
    if (el.dataset.enabled === 'false' || el.classList.contains('is-disabled')) return;

    // Визначаємо колір: спершу data-атрибут, потім контейнер (#player1/#player2 або .player1/.player2)
    const colorAttr = el.getAttribute('data-color') as PlayerColor | null;
    const containerColor: PlayerColor | null =
      el.closest('#player1, .player1') ? 'red' :
      el.closest('#player2, .player2') ? 'blue' : null;

    const color = (colorAttr ?? containerColor) as PlayerColor | null;
    if (!color) return;

    // ГОЛОВНИЙ GUARD: кліки тільки активного кольору
    if (color !== activeColor) return;

    onShipClick(el, color);
  });
}

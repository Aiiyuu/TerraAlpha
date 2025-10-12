export type PlayerColor = 'red' | 'blue';

let activeColor: PlayerColor = 'red';


function qsa<T extends Element = Element>(sel: string, root: ParentNode = document) {
  return Array.from(root.querySelectorAll<T>(sel));
}

function getShips(color: PlayerColor): HTMLElement[] {
  const byData = qsa<HTMLElement>(`[data-ship][data-color="${color}"]`);
  const byId = qsa<HTMLElement>(
    `${color === 'red' ? '#player1' : '#player2'} .hand-grid .cell-btn`
  );
  const byClass = qsa<HTMLElement>(
    `${color === 'red' ? '.player1' : '.player2'} .hand-grid .cell-btn`
  );

  return [...new Set([...byData, ...byId, ...byClass])];
}

function applyShipEnabledState(ships: HTMLElement[], enabled: boolean) {
  ships.forEach((el) => {
    el.classList.toggle('is-disabled', !enabled);

    el.setAttribute('aria-disabled', (!enabled).toString());
    el.setAttribute('tabindex', enabled ? '0' : '-1');
    el.dataset.enabled = String(enabled);
    if (!enabled) el.style.cursor = 'not-allowed';
    else el.style.removeProperty('cursor');
  });
}

export function setShipsEnabled(color: PlayerColor, enabled: boolean) {
  applyShipEnabledState(getShips(color), enabled);
}

export function setActivePlayer(color: PlayerColor) {
  activeColor = color;
  const opponent: PlayerColor = color === 'red' ? 'blue' : 'red';
  setShipsEnabled(color, true);
  setShipsEnabled(opponent, false);
  document.documentElement.dataset.activeColor = color;
}

export function setupShipInteractivity(
  onShipClick: (el: HTMLElement, color: PlayerColor) => void
) {
  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement)?.closest<HTMLElement>(
      '[data-ship], .ship, .hand-grid .cell-btn'
    );
    if (!el) return;

    if (el.dataset.enabled === 'false' || el.classList.contains('is-disabled')) return;

    const colorAttr = el.getAttribute('data-color') as PlayerColor | null;
    const containerColor: PlayerColor | null =
      el.closest('#player1, .player1') ? 'red' :
      el.closest('#player2, .player2') ? 'blue' : null;

    const color = (colorAttr ?? containerColor) as PlayerColor | null;
    if (!color) return;

    if (color !== activeColor) return;

    onShipClick(el, color);
  });
}

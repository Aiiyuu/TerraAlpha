// src/state/actions.ts
import { Store } from './store';
import { CellStatus } from './types';
import type { CellQa, PlayerColor, ShipKind } from './types';
import { getCellStatus, isOccupiedByAny, nextStatusForPlayerKind } from './selectors';

export function occupyCell(qa: CellQa, status: CellStatus) {
  const st = Store.get();
  if (isOccupiedByAny(qa)) return false;
  Store.set({ cells: { ...st.cells, [qa]: status } }, { type: 'cell:occupy', qa, status });
  return true;
}

export function freeCell(qa: CellQa) {
  const st = Store.get();
  if (!st.cells[qa] || st.cells[qa] === CellStatus.Empty) return false;
  Store.set({ cells: { ...st.cells, [qa]: CellStatus.Empty } }, { type: 'cell:free', qa });
  return true;
}

export function moveShip(fromQa: CellQa, toQa: CellQa) {
  const st = Store.get();
  const fromStatus = getCellStatus(fromQa);
  if (fromStatus === CellStatus.Empty) return false;

  const next = { ...st.cells };

  if (st.cells[toQa] && st.cells[toQa] !== CellStatus.Empty) {
    next[toQa] = fromStatus;
    next[fromQa] = CellStatus.Empty;
  } else {
    next[toQa] = fromStatus;
    next[fromQa] = CellStatus.Empty;
  }

  Store.set({ cells: next }, { type: 'ship:move', fromQa, toQa, status: fromStatus });
  return true;
}

export function changeHandCount(player: PlayerColor, kind: ShipKind, delta: number) {
  const st = Store.get();
  const next = Math.max(0, st.hands[player][kind] + delta);
  const hands = {
    ...st.hands,
    [player]: { ...st.hands[player], [kind]: next },
  };
  Store.set({ hands }, { type: 'hands:change', player, kind, delta, next });
}

export function placeFromHand(player: PlayerColor, kind: ShipKind, toQa: CellQa) {
  const status = nextStatusForPlayerKind(player, kind);
  if (!occupyCell(toQa, status)) return false;
  changeHandCount(player, kind, -1);
  return true;
}

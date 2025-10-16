// src/state/selectors.ts
import { Store } from './store';
import { CellStatus } from './types';
import type { GameState, CellQa, PlayerColor, ShipKind } from './types';

export const getState = (): GameState => Store.get();

export const getCellStatus = (qa: CellQa): CellStatus =>
  Store.get().cells[qa] ?? CellStatus.Empty;

export const isEmpty = (qa: CellQa) => getCellStatus(qa) === CellStatus.Empty;
export const isOccupiedByAny = (qa: CellQa) => getCellStatus(qa) !== CellStatus.Empty;

export function isOccupiedByPlayer(qa: CellQa, player: PlayerColor) {
  const st = getCellStatus(qa);
  return player === 'red'
    ? st === CellStatus.MotherRed || st === CellStatus.SimpleRed
    : st === CellStatus.MotherBlue || st === CellStatus.SimpleBlue;
}

export const getHands = () => Store.get().hands;

export function nextStatusForPlayerKind(player: PlayerColor, kind: ShipKind): CellStatus {
  if (player === 'red') return kind === 'mother' ? CellStatus.MotherRed : CellStatus.SimpleRed;
  return kind === 'mother' ? CellStatus.MotherBlue : CellStatus.SimpleBlue;
}

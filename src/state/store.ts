// src/state/store.ts
import type { GameState, Listener, CellsMap, PlayerColor, Hands } from './types';

const listeners = new Set<Listener>();

let state: GameState = {
  cells: {},
  hands: {
    red: { mother: 0, simple: 0 },
    blue: { mother: 0, simple: 0 },
  },
  active: 'red',
};

export const Store = {
  get(): GameState {
    return state;
  },
  set(next: Partial<GameState>, change?: any) {
    state = { ...state, ...next };
    for (const fn of listeners) fn(state, change);
    document.dispatchEvent(new CustomEvent('state:changed', { detail: { state, change } }));
  },
  replace(next: GameState, change?: any) {
    state = next;
    for (const fn of listeners) fn(state, change);
    document.dispatchEvent(new CustomEvent('state:changed', { detail: { state, change } }));
  },
  subscribe(fn: Listener) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};

export function initCells(map: CellsMap) {
  Store.set({ cells: map }, { type: 'cells:init' });
}
export function initHands(hands: Hands) {
  Store.set({ hands }, { type: 'hands:init' });
}
export function setActivePlayer(color: PlayerColor) {
  Store.set({ active: color }, { type: 'active:set', color });
}

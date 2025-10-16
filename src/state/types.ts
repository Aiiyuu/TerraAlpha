// src/state/types.ts
export type PlayerColor = 'red' | 'blue';

export const CellStatus = {
  Empty: 'empty',
  MotherRed: 'mother-red',
  MotherBlue: 'mother-blue',
  SimpleRed: 'simple-red',
  SimpleBlue: 'simple-blue',
} as const;

export type CellStatus = (typeof CellStatus)[keyof typeof CellStatus];

export type CellQa = string;

export type CellsMap = Record<CellQa, CellStatus>;

export type ShipKind = 'mother' | 'simple';

export type Hands = {
  red: { mother: number; simple: number };
  blue: { mother: number; simple: number };
};

export interface GameState {
  cells: CellsMap;
  hands: Hands;
  active: PlayerColor;
}

export type Listener = (state: GameState, change?: any) => void;

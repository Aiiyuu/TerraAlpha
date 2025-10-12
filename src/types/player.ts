export interface Player {
  id: number;
  avatar?: number;
  name: string;
  itsTurn: boolean,
  diceHistory: number[],
  diceStreak: number[],
  color?: string,
}
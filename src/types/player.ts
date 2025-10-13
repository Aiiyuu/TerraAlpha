export interface Player {
  id: string;
  avatar?: number;
  name: string;
  itsTurn: boolean,
  diceHistory: number[],
  diceStreak: number[],
  color?: string,
}
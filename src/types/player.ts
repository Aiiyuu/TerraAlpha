export interface Player {
  id: string;
  name: string;
  itsTurn: boolean,
  diceHistory: number[],
  diceStreak: number[],
}
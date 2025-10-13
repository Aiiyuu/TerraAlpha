import type { Player } from "./player.ts";

export interface Room {
  id: number;
  authorId: string;
  name: string;
  players: Player[];
  date: Date;
}
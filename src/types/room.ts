import type { Player } from "./player.ts";

export interface Room {
  id: number;
  authorId: number;
  name: string;
  players: Player[];
  date: Date;
  gameStarted?: boolean;
  isDiceRolling?: boolean;
}

export interface RoomEntry {
  id: number;
  name: string;
  players: Player[];
}

import type { Phrase } from "./phrase.ts";
import type { Player } from "./player.ts";

export interface Room {
  id: number;
  authorId: number;
  name: string;
  players: Player[];
  date: Date;

  gameStarted?: boolean;
  isDiceRolling?: boolean;
  phrases?: Phrase[];
}

export interface RoomEntry {
  id: number;
  name: string;
  players: Player[];
}

import type { Player } from "./player";

export type Phrase = {
  id: number,
  userName?: Player['name'],
  text: string,
  img: string,
  x?: number,
};
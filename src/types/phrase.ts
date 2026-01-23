import type { Player } from "./player";

export type Phrase = {
  id: number,
  userName?: Player['name'],
  img: string,
  x?: number,
  index?: number,
};
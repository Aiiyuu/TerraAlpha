import type { Player } from "./player";

export interface Action {
  id: number;
  type: ActionTypes;
  endsAt: string;
  duration: number;
  text: string;
  authorName: Player["name"];
}

export enum ActionTypes {
  RESET = "reset",
  INFORM = "inform",
  HINT = "hint",
  WARNING = "warning",
}

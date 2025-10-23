import type { Phrase } from "./phrase.ts";
import type { Player } from "./player.ts";

/* [ADDED] Типи для сторін і кораблів */
export type Side = "left" | "right"; // [ADDED]
export type ShipPos =                 // [ADDED]
  | "hand"                            // [ADDED]
  | `field-${1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24}` // [ADDED]
  | "final";                          // [ADDED]

export type LeftShipId =              // [ADDED]
  | "leftShip1" | "leftShip2" | "leftShip3" | "leftShip4" // [ADDED]
  | "leftShip5" | "leftShip6" | "leftShip7" | "leftMainShip"; // [ADDED]

export type RightShipId =             // [ADDED]
  | "rightShip1" | "rightShip2" | "rightShip3" | "rightShip4" // [ADDED]
  | "rightShip5" | "rightShip6" | "rightShip7" | "rightMainShip"; // [ADDED]

export type PlayerShipsLeft = Record<LeftShipId, ShipPos>;   // [ADDED]
export type PlayerShipsRight = Record<RightShipId, ShipPos>; // [ADDED]

export interface RoomShips {          // [ADDED]
  left: PlayerShipsLeft;              // [ADDED]
  right: PlayerShipsRight;            // [ADDED]
}

export interface Room {
  id: number;
  authorId: number;
  name: string;
  players: Player[];
  date: string; /* [CHANGED] було Date, у БД зберігається ISO-рядок */

  gameStarted?: boolean;
  isDiceRolling?: boolean;
  phrases?: Phrase[];
  lastDiceResult?: number;
  isTurn?: Side; /* [CHANGED] замінили літеральний union на тип Side */
  timerState?: string;

  ships?: RoomShips; /* [ADDED] стейт кораблів кімнати */
}

export interface RoomEntry {
  id: number;
  name: string;
  players: Player[];
}

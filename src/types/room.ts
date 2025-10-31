import type { Action } from "./action.ts";
import type { Phrase } from "./phrase.ts";
import type { Player } from "./player.ts";

/* [ADDED] Типи для сторін і кораблів */
export type Side = "left" | "right";
export type ShipPos =
  | "hand"
  | `field-${
      | 1
      | 2
      | 3
      | 4
      | 5
      | 6
      | 7
      | 8
      | 9
      | 10
      | 11
      | 12
      | 13
      | 14
      | 15
      | 16
      | 17
      | 18
      | 19
      | 20
      | 21
      | 22
      | 23
      | 24}`
  | "final";

export type LeftShipId =
  | "leftShip1"
  | "leftShip2"
  | "leftShip3"
  | "leftShip4"
  | "leftShip5"
  | "leftShip6"
  | "leftShip7"
  | "leftMainShip";

export type RightShipId =
  | "rightShip1"
  | "rightShip2"
  | "rightShip3"
  | "rightShip4"
  | "rightShip5"
  | "rightShip6"
  | "rightShip7"
  | "rightMainShip";

export type PlayerShipsLeft = Record<LeftShipId, ShipPos>;
export type PlayerShipsRight = Record<RightShipId, ShipPos>;

export interface RoomShips {
  left: PlayerShipsLeft;
  right: PlayerShipsRight;
}

export interface Room {
  id: number;
  authorId: number;
  name: string;
  players: Player[];
  date: string;

  actions?: Action[];
  gameStarted?: boolean;
  isDiceRolling?: boolean;
  phrases?: Phrase[];
  lastDiceResult?: number;
  isTurn?: Side;
  timerState?: string;
  lastResetOffer?: string;
  coin?: unknown;
  coinShown?: boolean;
  ships?: RoomShips;
  events?: unknown;
}

export interface RoomEntry {
  id: number;
  name: string;
  players: Player[];
  gameStarted?: boolean;
  isDiceRolling?: boolean;
  lastDiceResult?: number;
  timerState?: string;
  isTurn?: "left" | "right";
  coinShown?: boolean;
  coin?: unknown;
}

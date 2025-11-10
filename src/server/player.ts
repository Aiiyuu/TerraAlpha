import type { PlayerEntry } from "../types/player.ts";
import {
  getCurrentPlayerInfo,
  setCurrentPlayerId,
  setCurrentPlayerInfo,
  setCurrentPlayerName,
} from "./server.ts";
import { colors } from "../config.ts";

/**
 * Crates a player object using values from dom
 */
export function createNewPlayer() {
  const newPlayer: PlayerEntry = getCurrentPlayerInfo();

  // Write user data to the database
  setCurrentPlayerName(newPlayer.name);
  setCurrentPlayerId(newPlayer.id);
  setCurrentPlayerInfo(newPlayer);

  return newPlayer;
}

export function getRandomColor(): string {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

import type { PlayerEntry } from "../types/player.ts";
import {
  getCurrentPlayerInfo,
  setCurrentPlayerId,
  setCurrentPlayerInfo,
  setCurrentPlayerName,
} from "./server.ts";
import { avatars, colors } from "../config.ts";
import { getRandomId } from "../utility/getRandomId.ts";

/**
 * Crates a player object using values from dom
 */
export function createNewPlayer(): PlayerEntry {
  const currentPlayer = getCurrentPlayerInfo();

  if (!currentPlayer) {
    const newPlayer: PlayerEntry = {
      id: getRandomId(),
      name: `Player-${getRandomId()}`,
      color: getRandomColor(),
      avatar: getRandomAvatar(),
    };

    setCurrentPlayerName(newPlayer.name);
    setCurrentPlayerId(newPlayer.id);
    setCurrentPlayerInfo(newPlayer);

    return newPlayer;
  }

  return currentPlayer;
}

export function getRandomColor(): string {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

export function getRandomAvatar(): number {
  return Math.floor(Math.random() * avatars.length);
}

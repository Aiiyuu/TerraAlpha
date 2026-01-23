import type { PlayerEntry } from "../types/player.ts";
import {
  getCurrentPlayerInfo,
  setCurrentPlayerId,
  setCurrentPlayerInfo,
  setCurrentPlayerName,
} from "./server.ts";
import { avatars, colors } from "../config.ts";
import { getRandomId } from "../utility/getRandomId.ts";

function isValidPlayer(player: PlayerEntry): player is PlayerEntry {
  return (
    player &&
    typeof player.id === "number" &&
    !isNaN(player.id) &&
    typeof player.name === "string" &&
    player.name.trim() !== "" &&
    typeof player.color === "string" &&
    player.color.trim() !== "" &&
    typeof player.avatar === "number" &&
    !isNaN(player.avatar)
  );
}

export function createNewPlayer(): PlayerEntry {
  const currentPlayer = getCurrentPlayerInfo();

  if (!isValidPlayer(currentPlayer)) {
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

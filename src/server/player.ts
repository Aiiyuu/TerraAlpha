import type { PlayerEntry } from "../types/player.ts";
import { getRandomId } from "../utility/getRandomId.ts";
import { setCurrentPlayerId, setCurrentPlayerName } from "./server.ts";
import { colors, avatars } from "../config.ts";

/**
 * Crates a player object using values from dom
 */
export function createNewPlayer() {
  const id = getRandomId();
  const avatar = getAvatarId() || getRandomAvatar();
  const name = getPlayerName() || `User-${getRandomId()}`;
  const color = getColor() || getRandomColor();

  const newPlayer: PlayerEntry = {
    id,
    avatar,
    name,
    color,
  };

  // Write user data to the database
  setCurrentPlayerName(newPlayer.name);
  setCurrentPlayerId(newPlayer.id);

  return newPlayer;
}

function getPlayerName(): string | null {
  const playerNameInput = document.getElementById(
    "player-name"
  ) as HTMLInputElement;

  return playerNameInput.value;
}

function getAvatarId(): number | null {
  const avatars = [
    ...document.querySelectorAll(".avatar-item"),
  ] as HTMLImageElement[];
  let id = null;

  avatars.forEach((avatar) => {
    if (avatar.classList.contains("is-selected")) {
      id = Number(avatar.getAttribute("data-id"));
    }
  });

  return id;
}

function getColor(): string | null {
  const colorItems = [
    ...document.querySelectorAll(".color-item"),
  ] as HTMLInputElement[];

  const selectedColorItem = colorItems.find((item) =>
    item.classList.contains("is-selected")
  );

  return selectedColorItem?.getAttribute("data-color") || null;
}

export function getRandomColor(): string {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function getRandomAvatar(): number {
  const randomIndex = Math.floor(Math.random() * avatars.length);
  return randomIndex;
}

import type { PlayerEntry } from "../types/player.ts";
import { getRandomId } from "../utility/getRandomId.ts";
import { setCurrentPlayerId, setCurrentPlayerName, writeUserData } from "./server.ts";

/**
 * Crates a player object using values from dom
 */
export function createNewPlayer() {
  const playerNameInput = document.getElementById('player-name') as HTMLInputElement;
  const colorItems = [...document.querySelectorAll('.color-item')] as HTMLInputElement[];
  const selectedColorItem = colorItems.find(item => item.classList.contains('is-selected'));

  const id = getRandomId();
  const avatar = getAvatarId();
  const name = playerNameInput.value || `User-${getRandomId()}`;
  const color = selectedColorItem?.getAttribute('data-color') || '#6A0DAD'

  const newPlayer: PlayerEntry = {
    id,
    avatar,
    name,
    color,
  }

  // Write user data to the database
  writeUserData(newPlayer);
  setCurrentPlayerName(newPlayer.name);
  setCurrentPlayerId(newPlayer.id);

  return newPlayer;
}

/**
 * finds and returns selected avatar id;
 */
function getAvatarId() {
  const avatars = [...document.querySelectorAll('.avatar-item')] as HTMLImageElement[];
  let id = 0;

  avatars.forEach(avatar => {
    if (avatar.classList.contains('is-selected')) {
      id = Number(avatar.getAttribute('data-id'));
    }
  });

  return id;
}

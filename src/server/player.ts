import type { Player } from "../types/player.ts";
import { getRandomId } from "../utility/getRandomId.ts";

/**
 * Crates a player object using values from dom
 */
export function createNewPlayer() {
  const playerNameInput = document.getElementById('player-name') as HTMLInputElement;
  const colorItems = [...document.querySelectorAll('.color-item')] as HTMLInputElement[];
  const selectedColorItem = colorItems.find(item => item.classList.contains('is-selected'));
  const selectedColor = selectedColorItem?.getAttribute('data-color') || '#6A0DAD';

  const newPlayer: Player = {
    id: `${getRandomId()}`,
    avatar: getAvatarId(),
    name: playerNameInput.value || `User-${getRandomId()}`,
    itsTurn: true,
    diceHistory: [],
    diceStreak: [],
    color: selectedColor,
  }

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

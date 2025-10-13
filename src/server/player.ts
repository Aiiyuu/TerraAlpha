import type { Player } from "../types/player.ts";
import { getRandomId } from "../utility/getRandomId.ts";


/**
 * Crates a player object using values from dom
 */
export function createNewPlayer() {
  const playerNameInput = document.getElementById('player-name') as HTMLInputElement;
  const playerColorInput = document.getElementById('color') as HTMLInputElement;

  const newPlayer: Player = {
    id: `${getRandomId()}`,
    avatar: getAvatarId(),
    name: playerNameInput.value || `User-${getRandomId()}`,
    itsTurn: true,
    diceHistory: [],
    diceStreak: [],
    color: playerColorInput.value || '#6A0DAD',
  }

  return newPlayer;
}

/**
 * Creates and Returns a randomly generated user object
 */
export function createRandomPlayer(): Player {
  const newPlayer: Player = {
    id: `${getRandomId()}`,
    avatar: 5,
    name: `User-${getRandomId()}`,
    itsTurn: true,
    diceHistory: [],
    diceStreak: [],
    color: '#6A0DAD',
  }

  return newPlayer;
}

/**
 * finds and returns selected avatar id;
 */
function getAvatarId() {
  const avatars = [...document.querySelectorAll('.avatar-dropdown-item')] as HTMLImageElement[];
  let id = 0;

  avatars.forEach(avatar => {
    if (avatar.classList.contains('is-selected')) {
      id = Number(avatar.getAttribute('data-id'));
    }
  });

  return id;
}

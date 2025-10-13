import type { Player } from "../types/player.ts";
import { avatars } from "../config.ts";
const dialogs = [...document.querySelectorAll(".dialog")] as HTMLElement[];

const playerSection1 = document.querySelector('#player1') as HTMLElement;
const playerSection2 = document.querySelector('#player2') as HTMLElement;

/**
 * Updates colors on the page related to players. Changes players'
 * names and avatars.
 * @param playerColor1
 * @param playerColor2
 */
export function setupPlayerInfo(player1: Player, player2: Player) {
  document.body.style.setProperty('--player1-color', player1.color!);
  document.body.style.setProperty('--player2-color', player2.color!);

  changePlayerNameAndAvatar(playerSection1, player1);
  changePlayerNameAndAvatar(playerSection2, player2);

  changePlayerDialogName(dialogs[0], player1);
  changePlayerDialogName(dialogs[1], player2);
}

function changePlayerNameAndAvatar (wrapper: HTMLElement, player: Player) {
  const infoBlock: HTMLElement | null = wrapper.querySelector('.player-info');
  const nameField: HTMLElement | null = wrapper.querySelector('.player-name');

  if (nameField) {
    nameField.innerText = player.name;
  }

  if (infoBlock) {
    const img: HTMLImageElement = document.createElement('img');
    img.classList.add('player-avatar');
    img.src = avatars.find(avatars => avatars.id === player.avatar)?.img
      || avatars[0].img;

    infoBlock.appendChild(img);
  }
}

function changePlayerDialogName(dialog: HTMLElement, player: Player) {
  dialog.setAttribute('data-userName', player.name);
};
import type { Player } from "../types/player.ts";
import { avatars } from "../config.ts";
const dialogs = [...document.querySelectorAll(".dialog")] as HTMLElement[];

const playerSection1 = document.querySelector("#player1") as HTMLElement;
const playerSection2 = document.querySelector("#player2") as HTMLElement;

/**
 * Updates colors on the page related to players. Changes players'
 * names and avatars.
 * @param player
 */
export function setupLeftPlayer(player: Player) {
  playerSection1.classList.add('is-visible');
  document.body.style.setProperty("--player1-color", player.color!);
  changePlayerNameAndAvatar(playerSection1, player);
  changePlayerDialogName(dialogs[0], player);
}

/**
 * Updates colors on the page related to players. Changes players'
 * names and avatars.
 * @param player
 */
export function setupRightPlayer(player: Player) {
  playerSection1.classList.add('is-visible');
  playerSection2.classList.add('is-visible');
  document.body.style.setProperty("--player2-color", player.color!);
  changePlayerNameAndAvatar(playerSection2, player);
  changePlayerDialogName(dialogs[1], player);
}

function changePlayerNameAndAvatar(wrapper: HTMLElement, player: Player) {
  const infoBlock: HTMLElement | null = wrapper.querySelector(".player-info");
  const nameField: HTMLElement | null = wrapper.querySelector(".player-name");

  if (nameField) {
    nameField.innerText = player.name;
  }

  if (infoBlock) {
    const img: HTMLImageElement = document.createElement("img");
    img.classList.add("player-avatar");
    img.src =
      avatars.find((avatars) => avatars.id === player.avatar)?.img ||
      avatars[0].img;

    infoBlock.appendChild(img);
  }
}

function changePlayerDialogName(dialog: HTMLElement, player: Player) {
  dialog.setAttribute("data-userName", player.name);
}

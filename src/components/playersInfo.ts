import type { Player } from "../types/player.ts";
import { avatars } from "../config.ts";
import type { Room, Side } from "../types/room.ts";
import { setUpPlayerBtns } from "./playerButtons.ts";

const playerSection1 = document.querySelector("#player1") as HTMLElement;
const playerSection2 = document.querySelector("#player2") as HTMLElement;

/**
 * Updates colors on the page related to players. Changes players'
 * names and avatars.
 * @param player
 */
export function setupLeftPlayer(player: Player, currentPlayer?: Side) {
  document.body.style.setProperty("--player1-color", player.color!);
  changePlayerNameAndAvatar(playerSection1, player);

  setUpPlayerBtns(currentPlayer);
}

/**
 * Updates colors on the page related to players. Changes players'
 * names and avatars.
 * @param player
 */
export function setupRightPlayer(player: Player, currentPlayer?: Side) {
  document.body.style.setProperty("--player2-color", player.color!);
  playerSection2.classList.add("is-visible");
  changePlayerNameAndAvatar(playerSection2, player);

  setUpPlayerBtns(currentPlayer);
}

export function setupPlayerColors(
  roomState: Room,
  currentPlayerId: Player["id"]
) {
  const current = roomState.players.find(
    (player) => player.id === currentPlayerId
  );

  if (current) {
    document.documentElement.style.setProperty(
      "--current-player-color",
      current.color
    );
  }

  const notCurrent = roomState.players.find(
    (player) => player.id !== currentPlayerId
  );

  if (notCurrent) {
    document.documentElement.style.setProperty(
      "--not-current-player-color",
      notCurrent.color
    );
  }
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

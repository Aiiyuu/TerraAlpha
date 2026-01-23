import { avatars } from "../config.ts";
import {
  getCurrentPlayerInfo,
  setCurrentPlayerInfo,
} from "../server/server.ts";

const avatarMenu = document.getElementById("avatar-menu") as HTMLElement;
let avatarItems: HTMLElement[];

/**
 * This function sets up the avatars dropdown form.
 * It loads the arrow icon for the button and loads all available
 * avatars, creating a form for each of them.
 */
export function setUpdAvatars() {
  loadListItems();
}

/**
 * Iterates over each avatar in the avatars array
 * and creates a form list from those items.
 */
function loadListItems() {
  const currentPlayerInfo = getCurrentPlayerInfo();

  avatars.forEach((avatar) => {
    const div: HTMLDivElement = document.createElement("div");
    div.classList.add("avatar-item");
    div.setAttribute("data-id", String(avatar.id));

    const img: HTMLImageElement = document.createElement("img");
    img.src = avatar.img;

    if (
      currentPlayerInfo &&
      currentPlayerInfo.avatar &&
      currentPlayerInfo.avatar == avatar.id
    ) {
      div.classList.add("is-selected");
    }

    div.appendChild(img);

    div.addEventListener("click", () => {
      selectAvatar(div);
    });

    avatarMenu.append(div);
  });
}

/**
 * Adds the "is-selected" class to the selected avatar and removes
 * the "is-selected" class from other avatars if necessary.
 * @param {HTMLElement} avatar
 */
function selectAvatar(avatar: HTMLElement) {
  if (!avatarItems) {
    avatarItems = [
      ...document.querySelectorAll(".avatar-item"),
    ] as HTMLElement[];
  }

  avatarItems.forEach((item) => {
    item.classList.remove("is-selected");
  });

  const currentPlayer = getCurrentPlayerInfo();
  setCurrentPlayerInfo({
    ...currentPlayer,
    avatar: avatar.getAttribute("data-id"),
  });

  avatar.classList.add("is-selected");
}

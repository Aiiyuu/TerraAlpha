import { avatars } from "../config.ts";

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
  avatars.forEach((avatar, index) => {
    const div: HTMLDivElement = document.createElement("div");
    div.classList.add("avatar-item");
    div.setAttribute("data-id", String(avatar.id));

    if (index === 0) {
      div.classList.add('is-selected');
    }

    const img: HTMLImageElement = document.createElement("img");
    img.src = avatar.img;

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

  avatar.classList.add("is-selected");
}

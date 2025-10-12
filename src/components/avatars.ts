import arrowIcon from "../assets/icons/arrow.png";
import { avatars } from "../config.ts";

const avatarDropdown = document.getElementById("avatar-dropdown") as HTMLElement;
const avatarList = document.querySelector('.avatar-dropdown-list') as HTMLElement;
const avatarDropdownBtn = avatarDropdown.querySelector(".avatar-dropdown-btn") as HTMLElement;
let avatarItems: HTMLElement[];

const COLUMNS = [
  { width: 0, columns: 3 },  // Default to 3 columns for smaller screens
  { width: 900, columns: 4 } // Switch to 4 columns for larger screens
];
const BORDER_SIZE = 3;
let height: number;

/**
 * This function sets up the avatars dropdown form.
 * It loads the arrow icon for the button and loads all available
 * avatars, creating a form for each of them.
 */
export function setUpdAvatars() {
  loadArrowIcon();
  loadListItems();
  hideDropdown();

  avatarDropdownBtn.addEventListener("click", toggleDropdown);
}

/**
 * This function dynamically loads the arrow icon
 */
function loadArrowIcon() {
  // Dynamically load arrow icon for the button
  const style: HTMLStyleElement = document.createElement('style');
  style.textContent = `
      .avatar-dropdown-btn::after {
        background-image: url(${arrowIcon});
      }
    `;
  document.head.appendChild(style);
}

/**
 * Iterates over each avatar in the avatars array
 * and creates a form list from those items.
 */
function loadListItems() {
  const listWrapper: HTMLDivElement = document.createElement("div");
  listWrapper.classList.add("avatar-dropdown-list-wrapper");

  avatars.forEach((avatar) => {
    const img: HTMLImageElement = document.createElement("img");
    img.classList.add("avatar-dropdown-item");
    img.src = avatar.img;
    listWrapper.appendChild(img);
    img.setAttribute('data-id', String(avatar.id));

    if (!height) {
      const computedStyles: CSSStyleDeclaration = window.getComputedStyle(img);
      height = parseFloat(computedStyles.height)
    }

    img.addEventListener("click", (event: PointerEvent) => {
      selectAvatar(event.target as HTMLElement);
    });

    avatarList.appendChild(listWrapper);
  });
}

function hideDropdown() {
  avatarDropdown.classList.remove("is-collapsed");
  avatarList.style.height = "0";
}

function getColumns() {
  const width = window.innerWidth;

  for (let i = COLUMNS.length - 1; i >= 0; i--) {
    if (width >= COLUMNS[i].width) {
      return COLUMNS[i].columns;
    }
  }
  return COLUMNS[0].columns; // Default if no match found
}

function collapseDropdown() {
  avatarDropdown.classList.add("is-collapsed");
  avatarList.style.opacity = "1";

  const numColumns = getColumns();
  const totalHeight = height * Math.ceil(avatars.length / numColumns) + BORDER_SIZE * 2;

  avatarList.style.height = `${totalHeight}px`;
}

function toggleDropdown() {
  if (avatarDropdown.classList.contains("is-collapsed")) {
    hideDropdown();
  } else {
    collapseDropdown();
  }
}

/**
 * Adds the "is-selected" class to the selected avatar and removes
 * the "is-selected" class from other avatars if necessary.
 * @param {HTMLElement} avatar
 */
function selectAvatar(avatar: HTMLElement) {
  if (!avatarItems) {
    avatarItems = [...document.querySelectorAll('.avatar-dropdown-item')] as HTMLElement[];
  }

  avatarItems.forEach((item) => {
    if (item.classList.contains("is-selected")) {
      item.classList.remove("is-selected");
    }
  })

  avatar.classList.add("is-selected");
  hideDropdown();
}
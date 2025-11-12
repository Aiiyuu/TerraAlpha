import lngText from "../language.json";
import type { FontFamily, FontSize } from "../types/font";
import type { Theme } from "../types/theme";
import { getLanguage } from "./language";

const dropdownKeys: string[] = [];

export function createDropdown<T extends { name: string }>(
  key: string,
  dropdown: HTMLElement,
  items: T[],
  onSelect: (item: T) => void
) {
  const btn = dropdown.querySelector(".dropdown-btn") as HTMLButtonElement;
  const list = dropdown.querySelector(".dropdown-list") as HTMLUListElement;
  const wrapper = dropdown.querySelector(
    ".dropdown-list-wrapper"
  ) as HTMLElement;

  if (!dropdownKeys.includes(key)) {
    btn.addEventListener("click", toggleDropdown);
    document.addEventListener("click", handleOutsideClick);
  }

  dropdownKeys.push(key);

  loadDropdownItems();

  function loadDropdownItems() {
    list.innerHTML = "";

    const texts = (lngText as never)[getLanguage()][key];

    for (const item of items) {
      const li = document.createElement("li");
      li.classList.add("dropdown-item");
      li.classList.add(`dropdown-item--${item.name}`);
      li.textContent = texts[item.name];

      if (key === "themes") {
        setupItemColor(li, item as unknown as Theme);
      }

      if (key === "font-sizes") {
        setupItemFontSize(li, item as unknown as FontSize);
      }

      if (key === 'font-families') {
        setupItemFontFamily(li, item as unknown as FontFamily);
      }

      li.addEventListener("click", () => {
        onSelect(item);
        hideDropdown();
      });

      list.append(li);
    }
  }

  function toggleDropdown() {
    if (dropdown.classList.contains("collapsed")) {
      hideDropdown();
    } else {
      collapseDropdown();
    }
  }

  function collapseDropdown() {
    dropdown.classList.add("collapsed");
    wrapper.style.height = `${list.clientHeight}px`;
  }

  function hideDropdown() {
    dropdown.classList.remove("collapsed");
    wrapper.style.height = "0";
  }

  function handleOutsideClick(event: MouseEvent) {
    if (!dropdown.contains(event.target as Node)) {
      hideDropdown();
    }
  }
}

function setupItemColor(li: HTMLLIElement, item: Theme) {
  li.style.backgroundColor = item.bgColor;
  li.style.color = item.textColor;
}

function setupItemFontSize(li: HTMLLIElement, item: FontSize) {
  li.style.fontSize = item.size;
}

function setupItemFontFamily(li: HTMLLIElement, item: FontFamily) {
  li.style.fontFamily = item.font;
}

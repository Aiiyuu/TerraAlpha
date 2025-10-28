import { colors } from "../config";

const colorPalette = document.querySelector("#color-palette") as HTMLElement;
let colorItems: HTMLElement[] | undefined;

/**
 * Creates a block of color items, with the first color selected by default.
 */
export function setupColorPalette() {
  colors.forEach((color) => {
    const span: HTMLSpanElement = document.createElement("span");
    span.classList.add("color-item");
    span.setAttribute("data-color", `${color}`);
    span.style.backgroundColor = `${color}`;

    colorPalette.append(span);

    span.addEventListener("click", selectColor);
  });
}

/**
 * Selects a color by adding the "is-selected" class to the element and
 * removes the "is-selected" class from previously selected colors.
 * @param {MouseEvent} event - The event that triggered the selection.
 */
function selectColor(event: MouseEvent) {
  if (!colorItems) {
    colorItems = [...document.querySelectorAll(".color-item")] as HTMLElement[];
  }

  colorItems.forEach((item) => {
    item.classList.remove("is-selected");
  });

  const target = event.target as HTMLElement;
  target.classList.add("is-selected");
}

import {phrases} from "../config.ts";

const dialogs: Element[] = [...document.querySelectorAll(".dialog")];

/**
 * This functions sets up the dialog screen, generates list of the
 * available phrases.
 */
export function setupDialog() {
  dialogs.forEach(dialog => {
    const dialogList: Element | null = dialog.querySelector(".dialog-list");
    const dialogButton: Element | null = dialog.querySelector(".dialog-button");

    if (!dialogList) {
      throw new Error("Dialog is not found!");
    }

    /* Generate a list of phrase dynamically based on the phrases array */
    phrases.forEach(phrase => {
      const li: HTMLLIElement = document.createElement("li");
      li.classList.add("dialog-list-item");

      const img: HTMLImageElement = document.createElement("img");
      img.src = phrase.img;

      const text: HTMLParagraphElement = document.createElement("p");
      text.innerHTML = phrase.text;

      li.appendChild(img);
      li.appendChild(text);

      dialogList.appendChild(li);
    });


    function toggleDialog() {
      if (dialog.classList.contains("dialog--active")) {
        dialog.classList.remove("dialog--active");
        return;
      }

      dialog.classList.add("dialog--active");
    }

    dialogButton?.addEventListener("click", () => toggleDialog);
  })
}
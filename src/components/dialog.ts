import { PHRASE_REMOVAL_DELAY, phrases } from "../config.ts";
import type { Phrase } from "../types/phrase.ts";
import arrowIcon from "../assets/icons/arrow.png";
import {
  addPhraseToRoom,
  getCurrentPlayerName,
  getCurrentRoomId,
} from "../server/server.ts";
import { getRandomId } from "../utility/getRandomId.ts";

const dialog = document.querySelector(".dialog") as HTMLElement;

const dialogContainer: HTMLElement | null =
  document.getElementById("dialog-container");

if (!dialogContainer) {
  throw new Error("Dialog container is not found!");
}

/**
 * This function is responsible for creating the phrase element
 * and displaying it inside the dialog container.
 * @param dialog
 * @param id
 */
export function showPhrase(phrase: Phrase) {
  const dialogPhrase: HTMLDivElement = document.createElement("div");
  dialogPhrase.classList.add("dialog-phrase");

  dialogPhrase.style.left = `${phrase.x}%`;

  const dialogImage: HTMLImageElement = document.createElement("img");
  dialogImage.src = phrase.img;
  dialogPhrase.appendChild(dialogImage);

  const dialogPhraseWrapper: HTMLDivElement = document.createElement("div");
  dialogPhraseWrapper.classList.add("dialog-phrase-wrapper");
  dialogPhrase.appendChild(dialogPhraseWrapper);

  const playerName: HTMLSpanElement = document.createElement("span");
  playerName.innerText = phrase.userName || "";
  dialogPhraseWrapper.appendChild(playerName);

  const dialogText: HTMLParagraphElement = document.createElement("p");
  dialogText.innerText = phrase.text;
  dialogPhraseWrapper.appendChild(dialogText);

  dialogContainer!.appendChild(dialogPhrase);

  // Remove the dialog phrase after a certain delay
  setTimeout(() => {
    dialogPhrase.remove();
  }, PHRASE_REMOVAL_DELAY);
}

/**
 * This function sets up the dialog screen, generates a list of available phrases,
 * and adds event listeners to all items in the generated list.
 */
export function setupDialog() {
  const dialogList = dialog.querySelector(".dialog-list") as HTMLElement;
  const dialogButton = dialog.querySelector(".dialog-button") as HTMLElement;

  // Dynamically load arrow icon for the button
  const style: HTMLStyleElement = document.createElement("style");
  style.textContent = `
      .dialog-button::after {
        background-image: url(${arrowIcon});
      }
    `;
  document.head.appendChild(style);

  if (!dialogList) {
    throw new Error("Dialog is not found!");
  }

  let computedStyles: CSSStyleDeclaration;

  hideDialog();

  /* Generate a list of phrase dynamically based on the phrases array */
  phrases.forEach((phrase) => {
    const li: HTMLLIElement = document.createElement("li");
    li.classList.add("dialog-list-item");

    const img: HTMLImageElement = document.createElement("img");
    img.src = phrase.img;

    const text: HTMLParagraphElement = document.createElement("p");
    text.innerHTML = phrase.text;

    li.appendChild(img);
    li.appendChild(text);

    dialogList.appendChild(li);

    if (!computedStyles) {
      computedStyles = window.getComputedStyle(li);
    }

    li.addEventListener("click", () => {
      const currentRoomdId = getCurrentRoomId()!;
      const MIN_X_POS = 20;
      const MAX_X_POS = 80;
      const randomX =
        Math.floor(Math.random() * (MAX_X_POS - MIN_X_POS + 1)) + MIN_X_POS;

      const newPhrase: Phrase = {
        id: getRandomId(),
        userName: getCurrentPlayerName(),
        text: phrase.text,
        img: phrase.img,
        x: randomX,
      };

      hideDialog();
      addPhraseToRoom(currentRoomdId, newPhrase);
    });
  });

  function showDialog() {
    dialog.classList.add("dialog--active");

    const height = parseFloat(computedStyles.height);
    dialogList.style.height = `${height * phrases.length}px`;
  }

  function hideDialog() {
    dialog.classList.remove("dialog--active");

    dialogList.style.height = "0px";
  }

  function toggleDialog() {
    if (dialog.classList.contains("dialog--active")) {
      hideDialog();
      return;
    }

    showDialog();
  }

  dialogButton?.addEventListener("click", toggleDialog);
}

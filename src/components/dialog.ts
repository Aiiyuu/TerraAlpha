import lngJSON from "../language.json";
import { PHRASE_REMOVAL_DELAY, phrases } from "../config.ts";
import type { Phrase } from "../types/phrase.ts";
import arrowIcon from "../assets/icons/arrow.png";
import {
  addPhraseToRoom,
  getCurrentPlayerInfo,
  getCurrentRoomId,
} from "../server/server.ts";
import { getRandomId } from "../utility/getRandomId.ts";
import { getLanguage } from "./language.ts";

const dialogContainer = document.getElementById(
  "dialog-container"
) as HTMLElement;

let computedStyles: CSSStyleDeclaration;

/**
 * This function is responsible for creating the phrase element
 * and displaying it inside the dialog container.
 * @param dialog
 * @param id
 */
export function showPhrase(phrase: Phrase) {
  const phraseTexts = lngJSON[getLanguage()]["phrases"];

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
  dialogText.innerText = (phraseTexts as Record<string, string>)[
    String(phrase.index)
  ];
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
  const dialog = document.querySelector(".dialog") as HTMLElement;
  const dialogList = dialog.querySelector(".dialog-list") as HTMLElement;
  const dialogButton = dialog.querySelector(".dialog-button") as HTMLElement;

  renderPhrases();

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

  hideDialog();

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

export function renderPhrases() {
  const phraseTexts = lngJSON[getLanguage()]["phrases"];
  const dialog = document.querySelector(".dialog") as HTMLElement;
  const dialogList = dialog.querySelector(".dialog-list") as HTMLElement;

  dialogList.innerHTML = "";

  function hideDialog() {
    dialog.classList.remove("dialog--active");
    dialogList.style.height = "0px";
  }

  phrases.forEach((phrase) => {
    const li = document.createElement("li");
    li.classList.add("dialog-list-item");
    computedStyles = window.getComputedStyle(li);

    const img = document.createElement("img");
    img.src = phrase.img;

    const text = document.createElement("p");
    const phraseText = (phraseTexts as Record<string, string>)[
      String(phrase.id)
    ];
    text.textContent = phraseText;

    li.appendChild(img);
    li.appendChild(text);

    dialogList.appendChild(li);

    li.addEventListener("click", () => {
      const currentRoomId = getCurrentRoomId()!;
      const MIN_X_POS = 20;
      const MAX_X_POS = 80;
      const randomX =
        Math.floor(Math.random() * (MAX_X_POS - MIN_X_POS + 1)) + MIN_X_POS;

      const currentPlayer = getCurrentPlayerInfo();
      let playerName = "Anonym";

      if (currentPlayer) {
        playerName = currentPlayer.name || "Anonym";
      }

      const newPhrase: Phrase = {
        id: getRandomId(),
        userName: playerName,
        index: phrase.id,
        img: phrase.img,
        x: randomX,
      };

      hideDialog();
      addPhraseToRoom(currentRoomId, newPhrase);
    });
  });
}

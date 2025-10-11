import { PHRASE_REMOVAL_DELAY, phrases } from "../config.ts";
import type { Phrase } from "../types/phrase.ts";
import arrowIcon from '../assets/icons/arrow.png';

const dialogs = [...document.querySelectorAll(".dialog")] as HTMLElement[];

const dialogContainer: HTMLElement | null = document.getElementById('dialog-container');

if (!dialogContainer) {
  throw new Error("Dialog container is not found!");
}

/**
 * This function is responsible for creating the phrase element
 * and displaying it inside the dialog container.
 * @param userName
 * @param id
 */
function showPhrase(userName: string, id: number) {
  const phrase: Phrase = phrases.find(phrase => phrase.id === id)!;
  const dialogPhrase: HTMLDivElement = document.createElement("div");
  dialogPhrase.classList.add("dialog-phrase");

  const minX = 20;
  const maxX = 80;
  const randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;

  dialogPhrase.style.left = `${randomX}%`;

  const dialogImage: HTMLImageElement = document.createElement("img");
  dialogImage.src = phrase.img;
  dialogPhrase.appendChild(dialogImage);

  const dialogPhraseWrapper: HTMLDivElement = document.createElement("div");
  dialogPhraseWrapper.classList.add("dialog-phrase-wrapper");
  dialogPhrase.appendChild(dialogPhraseWrapper);

  const playerName: HTMLSpanElement = document.createElement("span");
  playerName.innerText = userName;
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
  dialogs.forEach(dialog => {
    const userName: string = dialog.getAttribute('data-userName') || 'Невідомий гравець';
    const dialogList = dialog.querySelector(".dialog-list") as HTMLElement;
    const dialogButton = dialog.querySelector(".dialog-button") as HTMLElement;

    // Dynamically load arrow icon for the button
    const style: HTMLStyleElement = document.createElement('style');
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

      if (!computedStyles) {
        computedStyles = window.getComputedStyle(li);
      }

      li.addEventListener("click", () => {
        hideDialog();
        showPhrase(userName, phrase.id);
      });
    });

    function showDialog() {
      dialog.classList.add("dialog--active");

      const height = parseFloat(computedStyles.height);
      dialogList.style.height = `${height * phrases.length}px`;
    }

    function hideDialog() {
      dialog.classList.remove("dialog--active");

      dialogList.style.height = '0px';
    }

    function toggleDialog() {
      if (dialog.classList.contains("dialog--active")) {
        hideDialog();
        return;
      }

      showDialog();
    }

    dialogButton?.addEventListener("click", toggleDialog);
  })
}
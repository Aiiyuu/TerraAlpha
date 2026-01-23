import { Language } from "../types/language";
import ukFlag from "../assets/icons/United-Kingdom.svg";
import uaFlag from "../assets/icons/Ukraine.svg";
import language from "../language.json";
import { renderPhrases } from "./dialog";
import { setupTheme } from "./theme";
import { setupThemeFontSizes } from "./fontSizes";
import { setupThemeFontFamilies } from "./fontFamilies";
import { setupThemeCursors } from "./cursor";

let langBtns: HTMLButtonElement[] = [];

export function setupLanguage(selectors: string[] = ["#lng-btn"]) {
  langBtns = selectors
    .map((s) => document.querySelector<HTMLButtonElement>(s))
    .filter((b): b is HTMLButtonElement => Boolean(b));

  langBtns.forEach((btn) => btn.addEventListener("click", switchLanguage));
  translatePage();
}

export function translatePage() {
  const lng = getLanguage();
  updateLangBtns(lng);
  switchLanguageText(lng);
}

function switchLanguage() {
  const lng = getLanguage();
  const nextLng = lng === Language.EN ? Language.UA : Language.EN;
  setLanguage(nextLng);
  translatePage();
  renderPhrases();
  setupTheme();
  setupThemeFontSizes();
  setupThemeFontFamilies();
  setupThemeCursors();
}

function updateLangBtns(lng: Language) {
  const src = lng === Language.EN ? ukFlag : uaFlag;
  const html = `<img src="${src}" alt="${lng}" />`;
  langBtns.forEach((btn) => (btn.innerHTML = html));
}

function switchLanguageText(lng: Language) {
  const text = language[lng];
  const elementsText = [
    ...document.querySelectorAll("[data-lng]"),
  ] as HTMLElement[];
  const elementsPlaceholder = [
    ...document.querySelectorAll("[data-lng-placeholder]"),
  ] as HTMLInputElement[];

  elementsText.forEach((element) => {
    const textId = element.getAttribute("data-lng");
    const content =
      textId && textId in text ? text[textId as keyof typeof text] : "unknown";
    element.innerHTML = `${content}`;
  });

  elementsPlaceholder.forEach((element) => {
    const textId = element.getAttribute("data-lng-placeholder");
    const content =
      textId && textId in text ? text[textId as keyof typeof text] : "unknown";
    element.placeholder = `${content}`;
  });
}

export function getLanguage(): Language {
  return (localStorage.getItem("language") as Language) || Language.EN;
}

function setLanguage(lng: Language) {
  localStorage.setItem("language", lng);
}

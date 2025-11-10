import { Language } from "../types/language";
import ukFlag from "../assets/icons/United-Kingdom.svg";
import uaFlag from "../assets/icons/Ukraine.svg";
import language from "../language.json";
import { renderPhrases } from "./dialog";

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
}

function updateLangBtns(lng: Language) {
  const src = lng === Language.EN ? ukFlag : uaFlag;
  const html = `<img src="${src}" alt="${lng}" />`;
  langBtns.forEach((btn) => (btn.innerHTML = html));
}

function switchLanguageText(lng: Language) {
  const text = language[lng];
  const elements = [...document.querySelectorAll("[data-lng]")] as HTMLElement[];

  elements.forEach((element) => {
    const textId = element.getAttribute("data-lng");
    const content =
      textId && textId in text ? text[textId as keyof typeof text] : "unknown";
    element.innerHTML = `${content}`;
  });
}

export function getLanguage(): Language {
  return (localStorage.getItem("language") as Language) || Language.EN;
}

function setLanguage(lng: Language) {
  localStorage.setItem("language", lng);
}

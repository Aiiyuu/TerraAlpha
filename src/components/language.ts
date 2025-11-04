import { Language } from "../types/language";
import ukFlag from "../assets/icons/United-Kingdom.svg";
import uaFlag from "../assets/icons/Ukraine.svg";
import language from "../language.json";
import { renderPhrases } from "./dialog";

export function setupLanguage() {
  const lngBtn = document.getElementById("lng-btn") as HTMLElement;
  lngBtn.addEventListener("click", switchLanguage);
  translatePage();
}

export function translatePage() {
  const lng = getLanguage();

  updateLngBtn(lng);
  switchLanguageText(lng);
}

function switchLanguage() {
  const lng = (localStorage.getItem("language") as Language) || Language.EN;
  const nextLng = lng === Language.EN ? Language.UA : Language.EN;

  setLanguage(nextLng);
  translatePage();
  renderPhrases();
}

function updateLngBtn(lng: Language) {
  const lngBtn = document.getElementById("lng-btn") as HTMLElement;

  if (!lngBtn) return;

  const src = lng === Language.EN ? ukFlag : uaFlag;
  const flagIcon = `<img src="${src}" alert="${lng}" />`;

  lngBtn.innerHTML = flagIcon;
}

function switchLanguageText(lng: Language) {
  const text = language[lng];
  const elements = [
    ...document.querySelectorAll("[data-lng]"),
  ] as HTMLElement[];

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

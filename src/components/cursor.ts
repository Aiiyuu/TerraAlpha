/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-expect-error
import Cursorly from "cursorly.js";
import { createDropdown } from "./dropdown";
import { cursors } from "../config";
import type { Cursor } from "../types/cursor";

const cursorDropdown = document.querySelector(
  "#theme-cursor-dropdown"
) as HTMLElement;

const themeSVG = `
<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M23.2443 10.1397C23.4374 10.2996 23.6304 10.4595 23.8295 10.6244C25.1519 11.7211 26.4645 12.829 27.773 13.9426C28.7819 14.7993 29.8115 15.6266 30.8489 16.4486C31.7943 17.2116 32.7169 18.0004 33.6418 18.788C34.4792 19.4991 35.3245 20.1962 36.1859 20.8786C37.1969 21.6794 38.184 22.5043 39.1662 23.3406C40.3298 24.3305 41.5072 25.298 42.7042 26.2478C44.2511 27.487 45.777 28.7517 47.3032 30.0164C47.6533 30.3061 48.0039 30.5956 48.3548 30.8846C48.8133 31.2624 49.2701 31.6421 49.7268 32.0223C49.9846 32.2358 50.2425 32.4499 50.5081 32.6701C51.6715 33.7337 52.7006 34.7022 52.8245 36.3519C52.8664 39.1335 52.8664 39.1335 51.9944 40.3152C50.9044 41.429 49.8348 42.2905 48.2343 42.4553C47.8914 42.4569 47.8914 42.4569 47.5413 42.4587C47.2801 42.4613 47.0186 42.4638 46.7493 42.4667C46.4695 42.4672 46.1896 42.4677 45.9011 42.4683C45.303 42.4747 44.7049 42.4815 44.1067 42.488C43.1678 42.4955 42.2292 42.5017 41.2903 42.5066C40.3814 42.5123 39.4725 42.5224 38.5637 42.533C38.1477 42.533 38.1477 42.533 37.7233 42.533C35.5256 42.5618 33.4039 42.8723 31.5696 44.1699C31.3024 44.3533 31.3024 44.3533 31.0301 44.5405C29.634 45.6647 28.5725 47.0177 27.4879 48.4299C27.2511 48.7354 27.2511 48.7354 27.0095 49.0472C26.2264 50.0607 25.4533 51.0807 24.6961 52.1137C24.5603 52.2983 24.4245 52.4825 24.2845 52.6727C24.0316 53.0179 23.7805 53.3644 23.5317 53.7125C22.5565 55.0443 21.4605 56.3672 19.8592 56.9011C17.851 57.1206 16.3339 57.0517 14.6507 55.8886C13.0424 54.1186 12.9372 52.249 12.8397 49.9625C12.8216 49.6157 12.8029 49.2693 12.784 48.9228C12.742 48.1383 12.7032 47.3538 12.6664 46.5691C12.5977 45.1134 12.5199 43.658 12.4425 42.2029C12.2916 39.3493 12.1496 36.4955 12.0099 33.6414C11.9519 32.453 11.8925 31.2645 11.8321 30.0763C11.2568 18.7465 11.2568 18.7465 11.1876 14.0859C11.1791 13.7956 11.1705 13.5056 11.1617 13.2068C11.1555 11.4586 11.4572 10.3022 12.6029 8.95749C16.2176 5.3288 19.8947 7.34943 23.2443 10.1397Z" fill="black"/>
</svg>
`;

export function setupThemeCursors() {
  const cursor = new Cursorly.init({
    cursor: 0,
  });

  const onThemeSelect = (theme: Cursor) => {
    localStorage.setItem("theme-cursor", theme.name);
    console.log("Selected cursor:", theme.name);

    document
      .querySelectorAll(".cursorly, .cursorly-cursor, .cursorly-wrapper")
      .forEach((el) => el.remove());

    const effect = {
      name: theme.effect,
      ...(theme.shape ? { shape: theme.shape } : {}),
      ...(theme.color ? { color: theme.color } : {}),
      size: [3, 10], // [min, max] size of particles
    };

    cursor.setIcon(theme.cursor, effect);
    cursor.setEffect(effect);
  };

  const loadTheme = () => {
    let theme: Cursor["name"] | null = localStorage.getItem("theme-cursor");

    if (!theme) {
      theme = cursors[0].name;
    }

    onThemeSelect(cursors.find((t) => t.name === theme) || cursors[0]);
  };

  loadTheme();
  loadSVGIcon();

  const key = "cursors";
  createDropdown<Cursor>(key, cursorDropdown, cursors, onThemeSelect);
}

function loadSVGIcon() {
  const btn = cursorDropdown.querySelector(".dropdown-btn") as HTMLElement;
  btn.innerHTML = themeSVG;
}

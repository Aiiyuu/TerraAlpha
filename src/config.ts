import luckyImg from "./assets/images/phrases/lucky.png";
import looserImg from "./assets/images/phrases/looser.png";
import angryImg from "./assets/images/phrases/angry.png";
import winImg from "./assets/images/phrases/win.png";
import laughImg from "./assets/images/phrases/laugh.png";

import avatar1 from "./assets/images/avatars/avatar-1.png";
import avatar2 from "./assets/images/avatars/avatar-2.png";
import avatar3 from "./assets/images/avatars/avatar-3.png";
import avatar4 from "./assets/images/avatars/avatar-4.png";
import avatar5 from "./assets/images/avatars/avatar-5.png";
import avatar6 from "./assets/images/avatars/avatar-6.png";
import avatar7 from "./assets/images/avatars/avatar-7.png";
import avatar8 from "./assets/images/avatars/avatar-8.png";
import avatar9 from "./assets/images/avatars/avatar-9.png";

import type { Phrase } from "./types/phrase.ts";
import type { Avatar } from "./types/avatar.ts";

import lngJSON from "./language.json";
import { getLanguage } from "./components/language.ts";
import { Language } from "./types/language.ts";

export const PHRASE_REMOVAL_DELAY = 15000;
export const phrases: Phrase[] = [
  { id: 1, img: luckyImg },
  { id: 2, img: looserImg },
  { id: 3, img: angryImg },
  { id: 4, img: winImg },
  { id: 5, img: laughImg },
];

export const avatars: Avatar[] = [
  { id: 1, img: avatar1 },
  { id: 2, img: avatar2 },
  { id: 3, img: avatar3 },
  { id: 4, img: avatar4 },
  { id: 5, img: avatar5 },
  { id: 6, img: avatar6 },
  { id: 7, img: avatar7 },
  { id: 8, img: avatar8 },
  { id: 9, img: avatar9 },
];

export const colors: string[] = [
  "#FF2D55",
  "#FF9500",
  "#FFD60A",
  "#7B542F",
  "#34C759",
  "#0A84FF",
  "#AF52DE",
  "#561530",
];

export const RESET_BTN_COOLDOWN = 15000;

export const RESET_ACTION_DURATION = 10000;
export const INFORM_ACTION_DURATION = 5000;
export const COIN_RESULT_DURATION = 5000;
export const HEPER_WARNING_DURATION = 3000;
export const HELPER_WELCOME_DURATION = 8000;
export const HELPER_NOT_YOUR_TURN_DURATION = 5000;
export const HELPER_END_TURN_DURATION = 5000;

export const HELPER_TIMER_WARNING_THRESHOLD = 10000;
export const TIMER_DELAY_TO_CALL_HELPER = 10000;

type Placeholders = Record<string, string | number>;

export function helper(key: string, placeholders?: Placeholders) {
  const lng = getLanguage() || Language.EN;
  const keys = key.split(".");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = lngJSON[lng];

  for (const k of keys) {
    if (result && k in result) {
      result = result[k];
    } else {
      return key;
    }
  }

  if (typeof result === "string" && placeholders) {
    result = result.replace(/\{(\w+)\}/g, (_, p) => {
      return placeholders[p] !== undefined ? String(placeholders[p]) : `{${p}}`;
    });
  }

  return result;
}

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

export const PHRASE_REMOVAL_DELAY = 15000;
export const phrases: Phrase[] = [
  {
    id: 1,
    text: "О, повезло, повезло!",
    img: luckyImg,
  },
  {
    id: 2,
    text: "Ех, ти лузер!",
    img: looserImg,
  },
  {
    id: 3,
    text: "Зараз я тобі покажу, де раки зимують!",
    img: angryImg,
  },
  {
    id: 4,
    text: "Ще один крок і перемога!",
    img: winImg,
  },
  {
    id: 5,
    text: "Ти мене не обженеш!",
    img: laughImg,
  },
];

export const avatars: Avatar[] = [
  {
    id: 1,
    img: avatar1,
  },
  {
    id: 2,
    img: avatar2,
  },
  {
    id: 3,
    img: avatar3,
  },
  {
    id: 4,
    img: avatar4,
  },
  {
    id: 5,
    img: avatar5,
  },
  {
    id: 6,
    img: avatar6,
  },
  {
    id: 7,
    img: avatar7,
  },
  {
    id: 8,
    img: avatar8,
  },
  {
    id: 9,
    img: avatar9,
  },
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

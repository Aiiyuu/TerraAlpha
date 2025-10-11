import luckyImg from './assets/images/phrases/lucky.png';
import looserImg from './assets/images/phrases/looser.png';
import angryImg from './assets/images/phrases/angry.png';
import winImg from './assets/images/phrases/win.png';
import laughImg from './assets/images/phrases/laugh.png';
import type { Phrase } from "./types/phrase.ts";

export const PHRASE_REMOVAL_DELAY = 15000;
export const phrases: Phrase[] = [
  {
    id: 1,
    text: 'О, повезло, повезло!',
    img: luckyImg,
  },
  {
    id: 2,
    text: 'Ех, ти лузер!',
    img: looserImg,
  },
  {
    id: 3,
    text: 'Зараз я тобі покажу, де раки зимують!',
    img: angryImg,
  },
  {
    id: 4,
    text: 'Ще один крок і перемога!',
    img: winImg,
  },
  {
    id: 5,
    text: 'Ти мене не обженеш!',
    img: laughImg,
  }
];


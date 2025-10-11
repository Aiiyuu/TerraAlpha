import type {Phrase} from "./types/phrase.ts";

export const PHRASE_REMOVAL_DELAY = 15000;
export const phrases: Phrase[] = [
  {
    id: 1,
    text: 'О, повезло, повезло!',
    img: './src/assets/images/phrases/lucky.png',
  },
  {
    id: 2,
    text: 'Ех, ти лузер!',
    img: './src/assets/images/phrases/looser.png',
  },
  {
    id: 3,
    text: 'Зараз я тобі покажу, де раки зимують!',
    img: './src/assets/images/phrases/angry.png',
  },
  {
    id: 4,
    text: 'Ще один крок і перемога!',
    img: './src/assets/images/phrases/win.png',
  },
  {
    id: 5,
    text: 'Ти мене не обженеш!',
    img: './src/assets/images/phrases/laugh.png',
  }
];


import type {Phrases} from "./types/phrases.ts";

type InitialPhrase = Pick<Phrases, 'text' | 'img'>;

export const phrases: InitialPhrase[] = [
  {
    text: 'lorem1',
    img: '',
  },
  {
    text: 'lorem2',
    img: '',
  },
  {
    text: 'lorem3',
    img: '',
  },
  {
    text: 'lorem4',
    img: '',
  },
  {
    text: 'lorem5',
    img: '',
  }
];


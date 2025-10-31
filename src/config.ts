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
import type { Player } from "./types/player.ts";

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

export const RESET_BTN_COOLDOWN = 15000;

export const RESET_ACTION_DURATION = 10000;
export const INFORM_ACTION_DURATION = 5000;
export const COIN_RESULT_DURATION = 5000;
export const HEPER_WARNING_DURATION = 3000;


// export const helper = {
//   restartGame: (userName: Player["name"]) => `Gravec ${userName} bazhaie pere3anustutu ihru`,
//   acceptRestart: (userName: Player["name"]) => `Gravec ${userName} pryiniav vashu propozyciiu pere3anustutu hru`,
//   rejectRestart: (userName: Player["name"]) => `Gravec ${userName} vidkhylyv vashu propozyciiu pere3anustutu hru`,
//   coinWinner: (userName: Player["name"]) => `Gravec ${userName} vyhrav v monetsi, otzhe zaraz yoho khid. Kudai kybik!`,
//   currentPlayerCoinWinner: "Ty vyhrauv v monetsi! Zaraz tvii hid. Kudai kybik!",

//   diceStreak: (isCurrentPlayerStreak: boolean) => {
//     return isCurrentPlayerStreak
//       ? 'Tobi vypalo 6, znovu tvoja cherha kydaty kubyk'
//       : 'Supernku vypalo 6, znovu yoho cherha kydaty kubyk'
//   },
  
//   diceRes: (isCurrentPlayerStreak: boolean, res: number) => {
//     return isCurrentPlayerStreak
//       ? `Tobi vypalo ${res}. Tvoja cherha robutu hid!`
//       : `Supernuky vypalo ${res}, Yoho cherha robutu hid`
//   }
// };


export const helper = {
  restartGame: (userName: Player["name"]) => `Гравець ${userName} бажає перезапустити гру`,
  acceptRestart: (userName: Player["name"]) => `Гравець ${userName} прийняв вашу пропозиція перезапустити гру`,
  rejectRestart: (userName: Player["name"]) => `Гравець ${userName} відхилив вашу пропозиція перезапустити гру`,
  coinWinner: (userName: Player["name"]) => `Гравець ${userName} виграв в монетці, отже зараз його хід. Кидай кубик!`,
  currentPlayerCoinWinner: "Ти виграу в монетці! Зараз твій хід. Кидай кубик!",

  diceStreak: (isCurrentPlayerStreak: boolean) => {
    return isCurrentPlayerStreak
      ? 'Тобі випало 6, знову твоя черга кидати кубик'
      : 'Супернку випало 6, знову його черга кидати кубик'
  },
  
  diceRes: (isCurrentPlayerStreak: boolean, res: number) => {
    return isCurrentPlayerStreak
      ? `Тобі випало ${res}. Твоя черга робити хід!`
      : `Супернку випало ${res}, Його черга робити хід`
  }
};

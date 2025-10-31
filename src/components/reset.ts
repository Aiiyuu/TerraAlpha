import {
  helper,
  INFORM_ACTION_DURATION,
  RESET_ACTION_DURATION,
  RESET_BTN_COOLDOWN,
} from "../config";
import {
  addActionToRoom,
  getCurrentPlayerName,
  getCurrentRoomId,
  updateRoom,
} from "../server/server";
import { ActionTypes, type Action } from "../types/action";
import type { Room, RoomShips } from "../types/room";
import { getEndDate } from "../utility/getEndDate";
import { getRandomId } from "../utility/getRandomId";

const resetBtn = document.getElementById("reset-btn") as HTMLElement;
const cooldownProgress = document.getElementById(
  "reset-cooldown"
) as HTMLElement;

export function setupResetBtn() {
  resetBtn.addEventListener("click", () => {
    if (resetBtn.classList.contains("is-off")) return;

    const action: Action = {
      id: getRandomId(),
      type: ActionTypes.RESET,
      endsAt: getEndDate(RESET_ACTION_DURATION),
      duration: RESET_ACTION_DURATION,
      authorName: getCurrentPlayerName(),
      text: helper.restartGame(getCurrentPlayerName()),
    };

    addActionToRoom(getCurrentRoomId(), action).then(() => {
      updateRoom(getCurrentRoomId(), {
        lastResetOffer: new Date().toISOString(),
      });
    });
  });
}

/* Це буде диструктерезовано як props для хелпера (...handleReset), 
якщо користувач нажме acceptBtn, тоді викликається onAccept,
в іншому випадку, викликається onReject */
export const handleReset = {
  onAccept: () => {
    const action: Action = {
      id: getRandomId(),
      type: ActionTypes.INFORM,
      endsAt: getEndDate(INFORM_ACTION_DURATION),
      authorName: getCurrentPlayerName(),
      duration: INFORM_ACTION_DURATION,
      text: helper.acceptRestart(getCurrentPlayerName()),
    };

    addActionToRoom(getCurrentRoomId(), action);
    resetRoom();
  },

  onReject: () => {
    const action: Action = {
      id: getRandomId(),
      type: ActionTypes.INFORM,
      endsAt: getEndDate(INFORM_ACTION_DURATION),
      authorName: getCurrentPlayerName(),
      duration: INFORM_ACTION_DURATION,
      text: helper.rejectRestart(getCurrentPlayerName()),
    };

    addActionToRoom(getCurrentRoomId(), action);
  },
};

export function syncResetBtn(lastResetOffer: Room["lastResetOffer"]) {
  if (!lastResetOffer) return;

  const lastResetTime = new Date(lastResetOffer).getTime();
  const now = Date.now();

  if (now - lastResetTime >= RESET_BTN_COOLDOWN) {
    resetBtn.classList.remove("is-off");
  } else {
    resetBtn.classList.add("is-off");
    runCooldownAnimation();

    const remaining = RESET_BTN_COOLDOWN - (now - lastResetTime);
    setTimeout(() => resetBtn.classList.remove("is-off"), remaining);
  }
}

function runCooldownAnimation() {
  cooldownProgress.style.animation = "none";
  void cooldownProgress.offsetWidth;
  cooldownProgress.style.animation = `cooldown-progress ${RESET_BTN_COOLDOWN}ms linear forwards`;
}

function resetRoom() {
  updateRoom(getCurrentRoomId(), {
    coin: {},
    ships: {} as RoomShips,
    coinShown: false,
    date: new Date().toISOString(),
    isDiceRolling: false,
    lastDiceResult: -1,
    lastResetOffer: "",
    timerState: "",
    events: {},
  });

  /*
  Тут треба написати логіку для:

    1. Очищення ігрово поля від кораблів, якими вже походили
    2. Заново підкинути монетку
  */
}

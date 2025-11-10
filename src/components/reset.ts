import { helper, INFORM_ACTION_DURATION, RESET_BTN_COOLDOWN } from "../config";
import { createRestartRoom } from "../server/createGameRoom";
import {
  addActionToRoom,
  getCurrentPlayerName,
  getCurrentRoomId,
  setSuggestRestart,
  clearSuggestRestart,
  updateRoom,
  getRestartRoomId,
  getCurrentPlayerInfo,
  deleteRestartRoomId,
  addNewPlayerToRoom,
  setCurrentRoomId,
  getRoomById,
} from "../server/server";
import { ActionTypes, type Action } from "../types/action";
import type { Room, Side } from "../types/room";
import { getEndDate } from "../utility/getEndDate";
import { animatePageSwitching, showGame } from "./pageSwitcher";

let resetBtn: HTMLElement | undefined;
let timerInterval: number | undefined;

export function showMenu(panel: HTMLElement) {
  panel.classList.remove("is-hidden");
  panel.setAttribute("aria-hidden", "false");
}

export function hideMenu(panel: HTMLElement) {
  panel.classList.add("is-hidden");
  panel.setAttribute("aria-hidden", "true");
}

export function resetRestartState(panel: HTMLElement) {
  const restartBtn = panel.querySelector(
    ".gm-restart"
  ) as HTMLButtonElement | null;
  const yesBtn = panel.querySelector(".gm-yes") as HTMLButtonElement | null;
  const noBtn = panel.querySelector(".gm-no") as HTMLButtonElement | null;
  const exitBtn = panel.querySelector(".gm-exit") as HTMLButtonElement | null;
  const timerEl = panel.querySelector(".gm-timer") as HTMLElement | null;

  restartBtn?.classList.remove("is-hidden");
  yesBtn?.classList.add("is-hidden");
  noBtn?.classList.add("is-hidden");
  exitBtn?.classList.remove("is-hidden");
  timerEl?.classList.add("is-hidden");
}

export function startTimer(
  panel: HTMLElement,
  startedAt: number,
  duration: number,
  isResponder = false
) {
  const timerEl = panel.querySelector(".gm-timer") as HTMLElement | null;
  const yesBtn = panel.querySelector(".gm-yes") as HTMLButtonElement | null;
  const noBtn = panel.querySelector(".gm-no") as HTMLButtonElement | null;
  const exitBtn = panel.querySelector(".gm-exit") as HTMLButtonElement | null;
  const restartBtn = panel.querySelector(
    ".gm-restart"
  ) as HTMLButtonElement | null;

  if (isResponder) {
    exitBtn?.classList.add("is-hidden");
    restartBtn?.classList.add("is-hidden");
    yesBtn?.classList.remove("is-hidden");
    noBtn?.classList.remove("is-hidden");
  } else {
    restartBtn?.classList.add("is-hidden");
    exitBtn?.classList.add("is-hidden");
    yesBtn?.classList.add("is-hidden");
    noBtn?.classList.add("is-hidden");
  }

  if (!timerEl) return;
  timerEl.classList.remove("is-hidden");
  clearInterval(timerInterval);

  const update = () => {
    const elapsed = Date.now() - startedAt;
    const remaining = Math.max(0, Math.ceil((duration - elapsed) / 1000));
    timerEl.textContent = String(remaining);
    if (remaining <= 0) {
      clearInterval(timerInterval);
      hideMenu(panel);
      resetRestartState(panel);
      clearSuggestRestart(getCurrentRoomId());
    }
  };

  update();
  timerInterval = window.setInterval(update, 500);
}

export function setupResetBtn(currentPlayerSide?: Side) {
  resetBtn = document.getElementById("reset-btn") as HTMLElement;
  if (!resetBtn) return;

  const mySide =
    currentPlayerSide ||
    (document.body.getAttribute("data-my-side") as Side | null) ||
    "left";

  const container = resetBtn.closest(
    ".player-navigation"
  ) as HTMLElement | null;
  const panel = container?.querySelector(".game-menu") as HTMLElement | null;
  if (!panel) return;

  const closeBtn = panel.querySelector(".gm-close") as HTMLButtonElement | null;
  const exitBtn = panel.querySelector(".gm-exit") as HTMLButtonElement | null;
  const restartBtn = panel.querySelector(
    ".gm-restart"
  ) as HTMLButtonElement | null;
  const yesBtn = panel.querySelector(".gm-yes") as HTMLButtonElement | null;
  const noBtn = panel.querySelector(".gm-no") as HTMLButtonElement | null;

  resetBtn.addEventListener("click", () => {
    if (resetBtn?.classList.contains("is-off")) return;
    if (panel.classList.contains("is-hidden")) {
      showMenu(panel);
      resetRestartState(panel);
    } else {
      hideMenu(panel);
    }
  });

  closeBtn?.addEventListener("click", () => {
    hideMenu(panel);
    resetRestartState(panel);
  });

  exitBtn?.addEventListener("click", () => {
    hideMenu(panel);
    resetRestartState(panel);
    window.location.reload();
  });

  restartBtn?.addEventListener("click", async () => {
    showMenu(panel);
    startTimer(panel, Date.now(), 10000, false);
    await setSuggestRestart(getCurrentRoomId(), mySide as Side);
  });

  yesBtn?.addEventListener("click", async () => {
    hideMenu(panel);
    resetRestartState(panel);
    await clearSuggestRestart(getCurrentRoomId());
    handleReset.onAccept();
  });

  noBtn?.addEventListener("click", async () => {
    hideMenu(panel);
    resetRestartState(panel);
    await clearSuggestRestart(getCurrentRoomId());
    handleReset.onReject();
  });
}

export const handleReset = {
  onAccept: () => {
    const action: Partial<Action> = {
      type: ActionTypes.INFORM,
      endsAt: getEndDate(INFORM_ACTION_DURATION),
      authorName: getCurrentPlayerName(),
      duration: INFORM_ACTION_DURATION,
      text: helper("helper.acceptRestart", { name: getCurrentPlayerName() }),
    };
    addActionToRoom(getCurrentRoomId(), action);
    resetRoom();
  },

  onReject: () => {
    const action: Partial<Action> = {
      type: ActionTypes.INFORM,
      endsAt: getEndDate(INFORM_ACTION_DURATION),
      authorName: getCurrentPlayerName(),
      duration: INFORM_ACTION_DURATION,
      text: helper("helper.rejectRestart", { name: getCurrentPlayerName() }),
    };
    addActionToRoom(getCurrentRoomId(), action);
  },
};

export function syncResetBtn(lastResetOffer: Room["lastResetOffer"]) {
  if (!lastResetOffer) return;

  const lastResetTime = new Date(lastResetOffer).getTime();
  const now = Date.now();

  if (now - lastResetTime >= RESET_BTN_COOLDOWN) {
    resetBtn?.classList.remove("is-off");
  } else {
    resetBtn?.classList.add("is-off");
    runCooldownAnimation();
    const remaining = RESET_BTN_COOLDOWN - (now - lastResetTime);
    setTimeout(() => resetBtn?.classList.remove("is-off"), remaining);
  }
}

function runCooldownAnimation() {
  const cooldownProgress = document.getElementById(
    "reset-cooldown"
  ) as HTMLElement;
  cooldownProgress.style.animation = "none";
  void cooldownProgress.offsetWidth;
  cooldownProgress.style.animation = `cooldown-progress ${RESET_BTN_COOLDOWN}ms linear forwards`;
}

async function resetRoom() {
  try {
    const restartRoom = await createRestartRoom();
    updateRoom(getCurrentRoomId(), { restartRoomId: restartRoom.id });
  } catch (error) {
    alert(`Failed creating restart room: ${error}`);
  }
}

export function setupRestartRedirect() {
  const restartRoomId = getRestartRoomId();

  if (!restartRoomId) return;

  logIntoRestartRoom();
}

async function logIntoRestartRoom() {
  try {
    const player = getCurrentPlayerInfo();
    const restartRoomId = getRestartRoomId();
    const room = await getRoomById(restartRoomId);

    if (!restartRoomId || !room) {
      throw new Error("Restart room not found or invalid room ID.");
    }

    await addNewPlayerToRoom(player, restartRoomId);

    setCurrentRoomId(restartRoomId);
    deleteRestartRoomId();

    animatePageSwitching(() => showGame(room));
  } catch (error) {
    alert(`Failed logging into restart room: ${error}`);
  }
}

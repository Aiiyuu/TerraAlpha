import { getCurrentPlayerId, getCurrentRoomId, updatePlayer } from "../../server/server";
import type { Room } from "../../types/room";
import { getCurrentTurnSide } from "../../components/game";

type OnStepClick = (value: number, index: number) => void;

let container: HTMLDivElement | null = null;
let lastButtons: HTMLButtonElement[] = [];
let isInitialized = false;

export function initStepsUI() {
  if (isInitialized) return;

  const mainBtn = document.getElementById("main-btn");
  if (!mainBtn || !mainBtn.parentElement) {
    throw new Error("[steps] main-btn not found or has no parent");
  }

  container = document.createElement("div");
  container.id = "steps-container";
  container.className = "steps-container";
  mainBtn.parentElement.insertBefore(container, mainBtn);

  isInitialized = true;
}

export function clearStepsButtons() {
  if (!container) return;
  lastButtons.forEach(b => b.remove());
  lastButtons = [];
}

export function renderStepsButtons(streak: number[], enabled: boolean, onClick: OnStepClick) {
  initStepsUI();
  if (!container) return;

  clearStepsButtons();
  if (!streak.length) return;

  const wrap = document.createElement("div");
  wrap.className = "steps-wrap";

  const side: "left" | "right" = getCurrentTurnSide();

  streak.forEach((value, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "steps-btn";
    btn.classList.add(`steps-btn--${side}`);
    btn.textContent = String(value);
    btn.disabled = !enabled;

    btn.addEventListener("click", () => {
      onClick(value, index);
    });

    lastButtons.push(btn);
    wrap.appendChild(btn);
  });

  container.appendChild(wrap);
}

export function consumeStepAt(index: number) {
  if (!container) return;
  const btn = lastButtons[index];
  if (btn) {
    btn.remove();
    lastButtons.splice(index, 1);
  }
  if (lastButtons.length === 0) {
    clearStepsButtons();
  }
}

export async function clearStreakOnServer(room: Room) {
  const myId = Number(getCurrentPlayerId());
  const meIndex = room.players.findIndex(p => p.id === myId);
  if (meIndex < 0) return;
  const side: "left" | "right" = meIndex === 0 ? "left" : "right";
  await updatePlayer(getCurrentRoomId(), side, { diceStreak: [] });
}

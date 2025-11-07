import { getCurrentPlayerId, getCurrentRoomId, updatePlayer } from "../../server/server";
import type { Room } from "../../types/room";
import { getCurrentTurnSide } from "../../components/game";

type OnStepClick = (value: number, index: number) => void;

let container: HTMLDivElement | null = null;
let lastButtons: HTMLButtonElement[] = [];
let isInitialized = false;
let selectedIndex: number | null = null;
let selectedValue: number | null = null;

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
  selectedIndex = null;
  selectedValue = null;
}

function clearSelection() {
  lastButtons.forEach(b => b.classList.remove("is-active"));
  selectedIndex = null;
  selectedValue = null;
}

export function getStepsForMove(): number | null {
  return selectedValue;
}

export function consumeCurrent() {
  if (selectedIndex == null) return;
  consumeStepAt(selectedIndex);
  clearSelection();
}

export function consumeStep(n: number) {
  const i = lastButtons.findIndex(b => Number(b.dataset.value) === n);
  if (i >= 0) {
    consumeStepAt(i);
    if (selectedIndex === i) clearSelection();
  }
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
    btn.dataset.value = String(value);
    btn.dataset.index = String(index);
    btn.disabled = !enabled;

    btn.addEventListener("click", () => {
      if (btn.disabled) return;
      lastButtons.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      selectedIndex = index;
      selectedValue = value;
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

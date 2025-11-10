// src/components/GlobalChat.ts
import { listenGlobalChat, sendGlobalMessage, getCurrentPlayerName } from "../server/server";

function $(s: string) {
  const el = document.querySelector(s);
  if (!el) throw new Error(`Missing element: ${s}`);
  return el as HTMLElement;
}

function getName(): string {
  const input = document.getElementById("player-name") as HTMLInputElement | null;
  const v = (input?.value ?? "").trim();
  return v.length >= 3 ? v.slice(0, 14) : getCurrentPlayerName();
}

function fmt(n: number) {
  return n < 10 ? `0${n}` : String(n);
}

function timeFromTs(ts: number | null) {
  const d = ts ? new Date(ts) : new Date();
  return `${fmt(d.getHours())}:${fmt(d.getMinutes())}:${fmt(d.getSeconds())}`;
}

function createItem(ts: number | null, name: string, text: string) {
  const li = document.createElement("li");
  li.className = "gchat-log__item";

  const nm = document.createElement("span");
  nm.className = "gchat-log__name";
  nm.textContent = `[${timeFromTs(ts)}] ${name}:`;

  const msg = document.createElement("span");
  msg.className = "gchat-log__msg";
  msg.textContent = ` ${text}`;

  li.appendChild(nm);
  li.appendChild(msg);
  return li;
}

export function initGlobalChat() {
  const input = $("#gchat-message") as HTMLInputElement;
  const btn = $("#gchat-send") as HTMLButtonElement;
  const list = $("#gchat-log-list") as HTMLUListElement;

  const updateBtn = () => {
    const text = input.value.trim();
    btn.disabled = text.length === 0;
  };

  listenGlobalChat((messages) => {
    const frag = document.createDocumentFragment();
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i];
      frag.appendChild(createItem(m.ts ?? null, m.name, m.text));
    }
    list.innerHTML = "";
    list.appendChild(frag);
  });

  input.addEventListener("input", updateBtn);
  input.addEventListener("keydown", async (e) => {
    if (e.key === "Enter" && !btn.disabled) {
      btn.click();
    }
  });

  btn.addEventListener("click", async () => {
    const text = input.value.trim().slice(0, 200);
    if (!text) return;
    btn.disabled = true;
    try {
      await sendGlobalMessage(getName(), text);
      input.value = "";
    } finally {
      updateBtn();
      input.focus();
    }
  });

  updateBtn();
}

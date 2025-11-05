import { listeToRoomById } from "../server/server";
import type { Room } from "../types/room";
import type { Side } from "../types/room";

type CanMoveMap = Partial<Record<Side, boolean>>;
type Unsubscribe = (() => void) | undefined;
type RoomWithCan = Room & { canPlayerMoveShips?: CanMoveMap };

function ensurePanel(): {
  el: HTMLDivElement;
  textEl: HTMLElement;
  show: (msg: string) => void;
  hide: () => void;
  destroy: () => void;
} {
  let el = document.getElementById("player-blocked-info") as HTMLDivElement | null;
  if (!el) {
    el = document.createElement("div");
    el.id = "player-blocked-info";
    el.setAttribute("role", "alertdialog");
    el.setAttribute("aria-live", "assertive");

    el.style.position = "fixed";
    el.style.left = "50%";
    el.style.bottom = "40px";
    el.style.transform = "translateX(-50%)";
    el.style.minWidth = "560px";
    el.style.maxWidth = "95vw";
    el.style.padding = "28px 32px";
    el.style.background = "rgba(245, 9, 9, 0.85)";
    el.style.color = "#fff";
    el.style.borderRadius = "16px";
    el.style.boxShadow = "0 12px 36px rgba(0,0,0,.4)";
    el.style.display = "none";
    el.style.zIndex = "9999";
    el.style.font = "600 20px/1.5 system-ui, -apple-system, Segoe UI, Roboto, Arial";

    const wrap = document.createElement("div");
    wrap.style.display = "grid";
    wrap.style.gridTemplateColumns = "1fr auto";
    wrap.style.alignItems = "center";
    wrap.style.gap = "24px";

    const text = document.createElement("div");
    text.id = "player-blocked-info-text";

    const btnWrap = document.createElement("div");
    btnWrap.style.display = "flex";
    btnWrap.style.gap = "12px";

    const okBtn = document.createElement("button");
    okBtn.type = "button";
    okBtn.textContent = "OK";
    okBtn.style.padding = "12px 20px";
    okBtn.style.background = "#2563eb";
    okBtn.style.border = "none";
    okBtn.style.color = "#fff";
    okBtn.style.fontSize = "18px";
    okBtn.style.borderRadius = "10px";
    okBtn.style.cursor = "pointer";

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.textContent = "×";
    closeBtn.setAttribute("aria-label", "Закрити");
    closeBtn.style.padding = "12px 20px";
    closeBtn.style.background = "#374151";
    closeBtn.style.border = "none";
    closeBtn.style.color = "#fff";
    closeBtn.style.fontSize = "20px";
    closeBtn.style.borderRadius = "10px";
    closeBtn.style.cursor = "pointer";

    const finalEl = el; 

    okBtn.addEventListener("click", () => {
      finalEl.style.display = "none";
    });
    closeBtn.addEventListener("click", () => {
      finalEl.style.display = "none";
    });

    btnWrap.append(okBtn, closeBtn);
    wrap.append(text, btnWrap);
    el.append(wrap);
    document.body.append(el);
  }

  const finalEl = el as HTMLDivElement;
  const textEl = document.getElementById("player-blocked-info-text") as HTMLElement;

  return {
    el: finalEl,
    textEl,
    show(msg: string) {
      textEl.textContent = msg;
      finalEl.style.display = "block";
    },
    hide() {
      finalEl.style.display = "none";
    },
    destroy() {
      finalEl.remove();
    },
  };
}

export function initPlayerBlockedInfo(roomId: Room["id"]): () => void {
  const panel = ensurePanel();
  let prevTurn: Side | undefined;
  let prevShownKey: string | null = null;

  const off = listeToRoomById(roomId, (room: Room | undefined) => {
    if (!room) return;

    const turn = room.isTurn as Side | undefined;
    if (!turn) {
      panel.hide();
      prevTurn = undefined;
      prevShownKey = null;
      return;
    }

    if (prevTurn && prevTurn !== turn) {
      panel.hide();
      prevShownKey = null;
    }
    prevTurn = turn;

    const canMap = (room as RoomWithCan).canPlayerMoveShips;
    const can = canMap?.[turn];

    if (can == null) {
      panel.hide();
      prevShownKey = null;
      return;
    }

    const key = `${turn}:${can}`;
    if (prevShownKey === key) return;
    prevShownKey = key;

    if (can === false) {
      const sideLabel = turn === "left" ? "Гравець Left заблокований" : "Гравець Right заблокований";
      panel.show(sideLabel);
    } else {
      panel.hide();
    }
  }) as Unsubscribe;

  return () => {
    off?.();  
    panel.destroy();
  };
}

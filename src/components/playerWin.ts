import { listeToRoomById } from "../server/server";
import type { Room } from "../types/room";
import type { Side, ShipPos } from "../types/room";

type Unsubscribe = (() => void) | undefined;

type RoomWithShips = Room & {
  ships?: Partial<Record<Side, Record<string, ShipPos>>>;
};

function ensureWinPanel() {
  let el = document.getElementById("player-win-panel") as HTMLDivElement | null;
  if (!el) {
    el = document.createElement("div");
    el.id = "player-win-panel";
    el.setAttribute("role", "alertdialog");
    el.setAttribute("aria-live", "assertive");
    el.style.position = "fixed";
    el.style.left = "50%";
    el.style.bottom = "40px";
    el.style.transform = "translateX(-50%)";
    el.style.minWidth = "560px";
    el.style.maxWidth = "95vw";
    el.style.padding = "28px 32px";
    el.style.background = "rgba(22, 163, 74, 0.92)";
    el.style.color = "#fff";
    el.style.borderRadius = "16px";
    el.style.boxShadow = "0 12px 36px rgba(0,0,0,.4)";
    el.style.display = "none";
    el.style.zIndex = "10000";
    el.style.font = "700 20px/1.5 system-ui, -apple-system, Segoe UI, Roboto, Arial";

    const wrap = document.createElement("div");
    wrap.style.display = "grid";
    wrap.style.gridTemplateColumns = "1fr auto";
    wrap.style.alignItems = "center";
    wrap.style.gap = "24px";

    const text = document.createElement("div");
    text.id = "player-win-panel-text";

    const btnWrap = document.createElement("div");
    btnWrap.style.display = "flex";
    btnWrap.style.gap = "12px";

    const okBtn = document.createElement("button");
    okBtn.type = "button";
    okBtn.textContent = "OK";
    okBtn.style.padding = "12px 20px";
    okBtn.style.background = "#14532d";
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
    closeBtn.style.background = "#166534";
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
  const textEl = document.getElementById("player-win-panel-text") as HTMLElement;

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

function allShipsInFinal0(room: RoomWithShips, side: Side): boolean {
  const group = room.ships?.[side];
  if (!group) return false;

  const prefix = side === "left" ? "p1" : "p2";
  const re = new RegExp(`^${prefix}-cell-\\d+$`);

  const values = Object.entries(group)
    .filter(([k, v]) => re.test(k) && v != null)
    .map(([, v]) => String(v).trim());

  if (values.length !== 8) return false;
  return values.every((v) => v === "final-0");
}

export function initPlayerWin(roomId: Room["id"]): () => void {
  const panel = ensureWinPanel();
  let prevWinner: Side | null = null;

  const off = listeToRoomById(roomId, (room: Room | undefined) => {
    if (!room) {
      panel.hide();
      prevWinner = null;
      return;
    }

    const r = room as RoomWithShips;
    const leftWon = allShipsInFinal0(r, "left");
    const rightWon = allShipsInFinal0(r, "right");

    let winner: Side | null = null;
    if (leftWon) winner = "left";
    else if (rightWon) winner = "right";

    if (winner && prevWinner !== winner) {
      panel.show(`Winner Player ${winner}`);
      prevWinner = winner;
    }

    if (!winner) {
      panel.hide();
      prevWinner = null;
    }
  }) as Unsubscribe;

  return () => {
    off?.();   
    panel.destroy();
  };
}

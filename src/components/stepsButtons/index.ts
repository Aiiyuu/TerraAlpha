import "./steps.css";

type StepsEvent = "step:select" | "step:combine" | "step:clear";
type Listener = (payload: any) => void;

class Emitter {
  private map = new Map<StepsEvent, Set<Listener>>();
  on(ev: StepsEvent, fn: Listener) {
    if (!this.map.has(ev)) this.map.set(ev, new Set());
    this.map.get(ev)!.add(fn);
  }
  off(ev: StepsEvent, fn: Listener) {
    this.map.get(ev)?.delete(fn);
  }
  emit(ev: StepsEvent, payload: any) {
    this.map.get(ev)?.forEach(fn => fn(payload));
  }
}

import { StepsState } from "./stepsState";
import { StepsButton } from "./StepsButton";
import { getCurrentTurnSide } from "../../components/game";

class StepsContainer {
  private emitter = new Emitter();
  private state = new StepsState();
  private host: HTMLElement | null = null;
  private wrap: HTMLDivElement | null = null;
  private comboBtn: HTMLButtonElement | null = null;
  private buttons: StepsButton[] = [];
  private enabled = false;

  mountBefore(el: HTMLElement) {
    const host = document.createElement("div");
    host.id = "steps-container";
    el.parentElement?.insertBefore(host, el);
    this.host = host;

    const wrap = document.createElement("div");
    wrap.className = "steps-wrap";
    host.appendChild(wrap);
    this.wrap = wrap;

    const combo = document.createElement("button");
    combo.type = "button";
    combo.className = "steps-btn";
    combo.style.display = "none";
    combo.addEventListener("click", () => {
      if (!this.enabled) return;
      this.state.clearSelection();
      this.paint();
      this.emitter.emit("step:clear", {});
    });
    wrap.appendChild(combo);
    this.comboBtn = combo;
  }

  render(streak: number[], enabled: boolean) {
    if (!this.host || !this.wrap || !this.comboBtn) return;

    const streakChanged = this.state.setStreak(streak);
    this.enabled = enabled;

    if (streakChanged) {
      this.buttons.forEach(b => b.destroy());
      this.buttons = streak.map((v, i) => {
        const btn = new StepsButton(v, () => {
          if (!this.enabled) return;
          const before = this.state.getSelectedIndices().length;
          const { total, indices } = this.state.selectIndex(i);
          this.paint();
          if (before === 0 && indices.length === 1) {
            this.emitter.emit("step:select", { index: i, value: v, total });
          } else {
            this.emitter.emit("step:combine", { indices, lastIndex: i, total });
          }
        });
        this.wrap!.appendChild(btn.el);
        return btn;
      });
    }

    this.paint();
  }

  clear() {
    if (!this.host) return;
    this.state.clear();
    this.paint();
  }

  getChosenStepsTotal(): number | null {
    return this.state.getTotal();
  }

  getSelectedCount(): number {
    return this.state.getSelectedIndices().length;
  }

  on(ev: StepsEvent, fn: Listener) {
    this.emitter.on(ev, fn);
  }

  off(ev: StepsEvent, fn: Listener) {
    this.emitter.off(ev, fn);
  }

  private paint() {
    if (!this.wrap || !this.comboBtn) return;

    const selected = new Set(this.state.getSelectedIndices());
    const total = this.state.getTotal();

    this.buttons.forEach((btn, idx) => {
      btn.setEnabled(this.enabled);
      const isChosen = selected.has(idx);
      btn.setHidden(isChosen);
      btn.setDimmed(total !== null && !isChosen);
    });

    if (total !== null && selected.size > 0) {
      this.comboBtn.style.display = "";
      this.comboBtn.disabled = !this.enabled;
      this.comboBtn.textContent = String(total);
      this.comboBtn.classList.remove("steps-btn--left", "steps-btn--right");
      const side = getCurrentTurnSide();
      this.comboBtn.classList.add(side === "left" ? "steps-btn--left" : "steps-btn--right");
    } else {
      this.comboBtn.style.display = "none";
    }
  }
}

const Steps = new StepsContainer();
export default Steps;
export type { StepsEvent };

export class StepsButton {
  el: HTMLButtonElement;

  constructor(value: number, onClick: () => void) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "steps-btn";
    btn.textContent = String(value);
    btn.addEventListener("click", onClick);
    this.el = btn;
  }

  setEnabled(enabled: boolean) {
    this.el.disabled = !enabled;
  }

  setHidden(hidden: boolean) {
    this.el.style.display = hidden ? "none" : "";
  }

  setDimmed(dim: boolean) {
    this.el.style.opacity = dim ? "0.6" : "";
  }

  destroy() {
    this.el.remove();
  }
}

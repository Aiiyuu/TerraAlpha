export class StepsButton {
  el: HTMLButtonElement;
  value: number;

  constructor(value: number, onClick: (value: number) => void) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "steps-btn";
    btn.textContent = String(value);
    btn.dataset.value = String(value);
    btn.addEventListener("click", () => onClick(value));
    this.el = btn;
    this.value = value;
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

  consume() {
    this.setHidden(true);
  }
}

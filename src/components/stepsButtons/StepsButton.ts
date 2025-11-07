export class StepsButton {
  el: HTMLButtonElement;
  value: number;
  index: number;

  constructor(value: number, index: number, onClick?: (value: number, index: number) => void) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "steps-btn";
    btn.textContent = String(value);
    btn.dataset.value = String(value);
    btn.dataset.index = String(index);

    btn.addEventListener("click", () => {
      if (typeof onClick === "function") {
        onClick(value, index);
      } else {
        console.warn("[StepsButton] Missing onClick callback", { value, index });
      }
    });

    this.el = btn;
    this.value = value;
    this.index = index;
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

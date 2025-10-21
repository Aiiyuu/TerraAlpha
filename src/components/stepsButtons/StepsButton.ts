export class StepsButton {
  el: HTMLButtonElement;
  private value: number;

  constructor(value: number, onClick: () => void) {
    this.value = value;
    this.el = document.createElement("button");
    this.el.type = "button";
    this.el.className = "steps-btn";
    this.el.textContent = String(value);
    this.el.addEventListener("click", onClick);
  }

  setEnabled(enabled: boolean) {
    this.el.disabled = !enabled;
  }

  setHidden(hidden: boolean) {
    this.el.style.display = hidden ? "none" : "";
  }

  setSelected(selected: boolean) {
    if (selected) {
      this.el.classList.add("is-selected");
      this.el.setAttribute("aria-pressed", "true");
    } else {
      this.el.classList.remove("is-selected");
      this.el.removeAttribute("aria-pressed");
    }
  }

  setDimmed(dim: boolean) {
    if (dim) this.el.classList.add("is-dimmed");
    else this.el.classList.remove("is-dimmed");
  }

  setLabel(text: string) {
    this.el.textContent = text;
  }

  destroy() {
    this.el.remove();
  }
}

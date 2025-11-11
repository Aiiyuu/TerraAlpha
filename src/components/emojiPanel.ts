import "emoji-picker-element";

type Options = {
  input: HTMLInputElement | string;
  button: HTMLButtonElement | string;
  placementOffset?: number;
  onPick?: (emoji: string) => void;
};

function getEl<T extends HTMLElement>(ref: T | string): T {
  if (typeof ref !== "string") return ref;
  const el = document.querySelector<T>(ref);
  if (!el) throw new Error(`Element not found: ${ref}`);
  return el;
}

export function initEmojiPanel(opts: Options) {
  const input = getEl<HTMLInputElement>(opts.input);
  const button = getEl<HTMLButtonElement>(opts.button);
  const offset = opts.placementOffset ?? 6;

  const popover = document.createElement("div");
  popover.id = "emoji-popover";
  popover.className = "emoji-popover is-hidden";

  const picker = document.createElement("emoji-picker");
  picker.id = "gchat-emoji-picker";
  popover.appendChild(picker);
  document.body.appendChild(popover);

  let isOpen = false;
  let lastSelStart = 0;
  let lastSelEnd = 0;

  const open = () => {
    popover.classList.remove("is-hidden");
    isOpen = true;
    position();
  };

  const close = () => {
    popover.classList.add("is-hidden");
    isOpen = false;
  };

  const toggle = () => (isOpen ? close() : open());

  const position = () => {
    const r = button.getBoundingClientRect();
    const wasHidden = popover.classList.contains("is-hidden");
    if (wasHidden) popover.classList.remove("is-hidden");
    const w = popover.offsetWidth || 320;
    const h = popover.offsetHeight || 360;
    if (wasHidden) popover.classList.add("is-hidden");

    const pad = 8;
    let left = Math.round(r.left);
    let top = Math.round(r.bottom + offset);

    if (left + w > window.innerWidth - pad)
      left = Math.max(pad, window.innerWidth - w - pad);
    if (top + h > window.innerHeight - pad)
      top = Math.max(pad, Math.round(r.top - h - offset));

    popover.style.position = "fixed";
    popover.style.left = `${left}px`;
    popover.style.top = `${top}px`;
  };

  const insertAtCursor = (emoji: string) => {
    input.focus();
    const start = input.selectionStart ?? lastSelStart ?? input.value.length;
    const end = input.selectionEnd ?? lastSelEnd ?? input.value.length;
    input.value = input.value.slice(0, start) + emoji + input.value.slice(end);
    const caret = start + emoji.length;
    input.setSelectionRange(caret, caret);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  };

  const onKeyUp = () => {
    lastSelStart = input.selectionStart ?? 0;
    lastSelEnd = input.selectionEnd ?? 0;
  };

  const onMouseUp = onKeyUp;

  const onBtnClick = (e: MouseEvent) => {
    e.stopPropagation();
    toggle();
  };

  const onPick = (e: Event) => {
    const detail = (e as CustomEvent).detail as { unicode: string };
    const value = detail?.unicode ?? "";
    if (!value) return;
    insertAtCursor(value);
    if (opts.onPick) opts.onPick(value);
    close();
  };

  const onDocClick = (e: MouseEvent) => {
    const t = e.target as Node;
    if (!popover.contains(t) && t !== button) close();
  };

  const onDocKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") close();
  };

  const onReflow = () => {
    if (isOpen) position();
  };

  input.addEventListener("keyup", onKeyUp);
  input.addEventListener("mouseup", onMouseUp);
  button.addEventListener("click", onBtnClick);
  picker.addEventListener("emoji-click", onPick as EventListener);
  document.addEventListener("click", onDocClick);
  document.addEventListener("keydown", onDocKey);
  window.addEventListener("scroll", onReflow, { passive: true });
  window.addEventListener("resize", onReflow, { passive: true });

  return {
    open,
    close,
    destroy() {
      close();
      input.removeEventListener("keyup", onKeyUp);
      input.removeEventListener("mouseup", onMouseUp);
      button.removeEventListener("click", onBtnClick);
      picker.removeEventListener("emoji-click", onPick as EventListener);
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onDocKey);
      window.removeEventListener("scroll", onReflow);
      window.removeEventListener("resize", onReflow);
      popover.remove();
    },
  };
}

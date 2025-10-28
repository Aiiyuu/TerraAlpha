type SwapOptions = {
  cellEl: HTMLElement;
  outBtn: HTMLElement;
  motherBtn: HTMLElement;
  spinMs?: number;
  popMs?: number;
};

function waitForAnimation(el: Element, timeout: number) {
  return new Promise<void>((resolve) => {
    let done = false;
    const onEnd = () => {
      if (done) return;
      done = true;
      el.removeEventListener('animationend', onEnd);
      resolve();
    };
    el.addEventListener('animationend', onEnd, { once: true });
    setTimeout(onEnd, timeout + 50);
  });
}

export async function runShipReplace({
  cellEl,
  outBtn,
  motherBtn,
  spinMs = 500,
  popMs = 200,
}: SwapOptions): Promise<void> {
  outBtn.classList.remove('ta-bump');
  outBtn.classList.add('swap-out');
  await waitForAnimation(outBtn, spinMs);
  outBtn.remove();

  cellEl.appendChild(motherBtn);
  motherBtn.classList.add('swap-in');
  await waitForAnimation(motherBtn, popMs);
  motherBtn.classList.remove('swap-in');
}

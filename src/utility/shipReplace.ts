import { flyShip } from '../components/ShipFly';

type SwapOptions = {
  cellEl: HTMLElement;
  outBtn: HTMLElement;
  motherBtn: HTMLElement;
  spinMs?: number;
  popMs?: number;
  stepMs?: number;
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

function parseCellIndex(el: HTMLElement | null): number | null {
  if (!el) return null;
  const qa = el.getAttribute('data-qa') || el.id || el.getAttribute('data-index') || '';
  if (/^final-0$/.test(qa)) return 27;
  if (/^final-1$/.test(qa)) return 26;
  if (/^final-2$/.test(qa)) return 25;
  const m = qa.match(/\b(?:field|cell)-(\d+)\b/) || qa.match(/\b(\d+)\b/);
  return m ? Number(m[1]) : null;
}

function prevIndex(idx: number): number {
  if (idx >= 27) return 26;
  if (idx === 26) return 25;
  if (idx === 25) return 24;
  return Math.max(1, idx - 1);
}

export async function runShipReplace({
  cellEl,
  outBtn,
  motherBtn,
  spinMs = 500,
  popMs = 200,
  stepMs = 160,
}: SwapOptions): Promise<void> {
  const fromCell = motherBtn.closest<HTMLElement>('.cell,[data-qa^="field-"],[data-qa^="cell-"],[data-qa^="final-"]');
  const fromIndex = parseCellIndex(fromCell);
  const toIndex = parseCellIndex(cellEl) ?? 27;
  const nearIndex = prevIndex(toIndex);

  if (fromIndex == null || nearIndex > fromIndex) {
    await flyShip({ shipEl: motherBtn, fromIndex, to: nearIndex, stepMs, hideOriginal: false });
  }

  outBtn.classList.remove('ta-bump');
  outBtn.classList.add('swap-out');
  await waitForAnimation(outBtn, spinMs);
  outBtn.remove();

  cellEl.appendChild(motherBtn);
  motherBtn.classList.add('swap-in');
  await waitForAnimation(motherBtn, popMs);
  motherBtn.classList.remove('swap-in');
}

const FINAL0_QA = '[data-qa="final-0"]';
const SHIP_SEL = '.cell-btn, [data-ship], .ship';

let sweepTimer: number | null = null;

function scheduleSweepFinal0() {
  if (sweepTimer !== null) window.clearTimeout(sweepTimer);
  sweepTimer = window.setTimeout(() => {
    const final0 = document.querySelector<HTMLElement>(FINAL0_QA);
    if (!final0) return;
    final0.querySelectorAll<HTMLElement>(SHIP_SEL).forEach(el => el.remove());
    sweepTimer = null;
  }, 1000);
}

function attachFinal0Observer() {
  const final0 = document.querySelector<HTMLElement>(FINAL0_QA);
  if (!final0) return;

  if (final0.querySelector(SHIP_SEL)) scheduleSweepFinal0();

  const mo = new MutationObserver(muts => {
    for (const m of muts) {
      if (m.type === 'childList' && (m.addedNodes.length || m.removedNodes.length)) {
        scheduleSweepFinal0();
      }
    }
  });

  mo.observe(final0, { childList: true, subtree: true });

  const reattach = new MutationObserver(() => {
    const current = document.querySelector(FINAL0_QA);
    if (current && current !== final0) {
      mo.disconnect();
      attachFinal0Observer();
    }
  });
  reattach.observe(document.body, { childList: true, subtree: true });
}

export function setupShipFinish() {
  attachFinal0Observer();
}

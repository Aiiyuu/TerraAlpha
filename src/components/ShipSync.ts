import { ref, onChildAdded, update, serverTimestamp, remove } from 'firebase/database';
import { database } from '../firebase';
import { runShipReplace } from '../utility/shipReplace';
import { animateShipFinalize } from '../utility/shipsFinalAnimation';

type Side = 'left' | 'right';
type MoveType = 'move' | 'replaceOwn' | 'overMother' | 'finalize';

type ShipEvent = {
  id: string;
  type: MoveType;
  side: Side;
  shipId: string;
  from: string | null;
  to: string;
  usedStep: number;
  ts?: number;
  applied?: boolean;
  ttl?: number;
};

function inferType(detail: {
  shipQa: string | null;
  fromIndex: number | null;
  toIndex: string;
  usedStep: number;
  finalizedQa?: string | null;
  finalizedToIndex?: string | null;
  moveKind?: MoveType;
}): MoveType {
  if (detail.moveKind) return detail.moveKind;
  if (detail.finalizedQa && detail.finalizedToIndex === 'final-0') {
    if (detail.finalizedQa === detail.shipQa) return 'overMother';
    return 'replaceOwn';
  }
  if (detail.toIndex === '0' || /final-0/.test(detail.toIndex)) return 'finalize';
  return 'move';
}

export function initShipSync(roomId: string) {
  document.addEventListener('shipmove:done', async (e: any) => {
    const d = e.detail as {
      shipQa: string | null;
      fromIndex: number | null;
      toIndex: string;
      usedStep: number;
      finalizedQa?: string | null;
      finalizedToIndex?: string | null;
      moveKind?: MoveType;
    };

    const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    const type = inferType(d);
    const side: Side = d.shipQa?.startsWith('p1-') ? 'left' : 'right';
    const from = d.fromIndex === null ? null : (d.fromIndex === 27 ? 'final-0' : `field-${d.fromIndex}`);
    const to = d.toIndex === '0' ? 'final-0' : (/^\d+$/.test(d.toIndex) ? `field-${d.toIndex}` : d.toIndex);
    const shipId = d.shipQa || '';

    const shipsPathMover = `rooms/${roomId}/ships/${side}/${shipId}`;
    const eventPath = `rooms/${roomId}/events/${id}`;

    const patch: Record<string, any> = { [eventPath]: { id, type, side, shipId, from, to, usedStep: d.usedStep, ts: serverTimestamp(), ttl: 120000, applied: true } };

    if (type === 'overMother') {
      patch[shipsPathMover] = 'final-0';
    } else if (type === 'replaceOwn') {
      patch[shipsPathMover] = to;
      if (d.finalizedQa) {
        const finSide: Side = d.finalizedQa.startsWith('p1-') ? 'left' : 'right';
        patch[`rooms/${roomId}/ships/${finSide}/${d.finalizedQa}`] = 'final-0';
      }
    } else {
      patch[shipsPathMover] = to;
    }

    await update(ref(database), patch);
  });

  const eventsRef = ref(database, `rooms/${roomId}/events`);
  onChildAdded(eventsRef, async (snap) => {
    const ev = snap.val() as ShipEvent;
    if (!ev) return;

    try {
      if (ev.type === 'replaceOwn') {
        const cell = pickCell(ev.to);
        const outBtn = cell?.querySelector<HTMLElement>('.cell-btn:not([data-qa$="cell-8"])');
        const motherBtn = findShipBtn(ev.shipId);
        if (cell && outBtn && motherBtn) await runShipReplace({ cellEl: cell, outBtn, motherBtn, spinMs: 500, popMs: 180 });
      } else if (ev.type === 'overMother') {
        const cell = pickCell(ev.to);
        const simpleBtn = findShipBtn(ev.shipId);
        if (cell && simpleBtn) await runSimpleOverMother(cell, simpleBtn);
      } else if (ev.type === 'finalize') {
        const btn = findShipBtn(ev.shipId);
        animateShipFinalize(btn!, ev.shipId);
      } else if (ev.type === 'move') {
        const cell = pickCell(ev.to);
        const btn = findShipBtn(ev.shipId);
        if (cell && btn) cell.appendChild(btn);
      }
    } finally {
      setTimeout(() => {
        remove(ref(database, `rooms/${roomId}/events/${ev.id}`)).catch(() => {});
      }, ev.ttl ?? 120000);
    }
  });
}

function pickCell(pos: string): HTMLElement | null {
  if (pos === 'final-0') return document.querySelector('.board [data-qa="final-0"]');
  const id = pos.replace(/^field-/, '');
  return (
    document.querySelector<HTMLElement>(`.board [data-qa="field-${id}"]`) ||
    document.querySelector<HTMLElement>(`.board [data-qa="cell-${id}"]`)
  );
}

function findShipBtn(shipId: string): HTMLElement | null {
  return document.querySelector<HTMLElement>(`.cell-btn[data-qa="${shipId}"], [data-qa="${shipId}"].cell-btn`);
}

async function runSimpleOverMother(cellEl: HTMLElement, simpleBtn: HTMLElement) {
  const m = cellEl.querySelector<HTMLElement>('.cell-btn');
  m?.classList.remove('ta-bump');
  simpleBtn.classList.add('is-overlay', 'over-spin');
  cellEl.appendChild(simpleBtn);
  await waitAnim(simpleBtn, 600);
  simpleBtn.remove();
}

function waitAnim(el: Element, timeout: number) {
  return new Promise<void>((res) => {
    let done = false;
    const end = () => { if (done) return; done = true; el.removeEventListener('animationend', end); res(); };
    el.addEventListener('animationend', end, { once: true });
    setTimeout(end, timeout + 50);
  });
}

// ShipSync.ts
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

function uuid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function inferType(detail: { shipQa: string | null; fromIndex: number | null; toIndex: string; usedStep: number }): MoveType {
  const shipId = detail.shipQa || '';
  const isMother = /-cell-8$/.test(shipId) || /mother/.test(shipId);
  if (detail.toIndex === '0' || /final-0/.test(detail.toIndex)) return 'finalize';
  // підказка: replaceOwn уже відіграється у твоєму shipMove, якщо ціль була своїм простим для mother
  // а overMother — якщо простий летів у клітинку зі своїм mother
  // Щоб визначити точніше, можна повісити temp-флаг у shipMove перед emitDone (наприклад, data-move-kind на елементі).
  return 'move';
}

export function initShipSync(roomId: string) {
  // 1) LISTEN локальним подіям від UI
  document.addEventListener('shipmove:done', async (e: any) => {
    const d = e.detail as { shipQa: string | null; fromIndex: number | null; toIndex: string; usedStep: number };
    const id = uuid();
    const type = inferType(d);

    const side: Side =
      d.shipQa?.startsWith('p1-') ? 'left' :
      d.shipQa?.startsWith('p2-') ? 'right' : 'left';

    const from = d.fromIndex === null ? null : (d.fromIndex === 27 ? 'final-0' : `field-${d.fromIndex}`);
    const to = d.toIndex === '0' ? 'final-0' : (/^\d+$/.test(d.toIndex) ? `field-${d.toIndex}` : d.toIndex);

    const shipId = d.shipQa || '';

    const event: ShipEvent = {
      id,
      type,
      side,
      shipId,
      from,
      to,
      usedStep: d.usedStep,
      applied: true,
      ttl: 120000
    };

    const shipsPath = `rooms/${roomId}/ships/${side}/${shipId}`;
    const eventPath = `rooms/${roomId}/events/${id}`;

    // 2) АТОМАРНО: запис події + оновлення позиції корабля
    await update(ref(database), {
      [eventPath]: { ...event, ts: serverTimestamp() },
      [shipsPath]: to,
    });
  });

  // 3) LISTEN подіям із БД (для пасивного гравця — відтворення анімацій)
  const eventsRef = ref(database, `rooms/${roomId}/events`);
  onChildAdded(eventsRef, async (snap) => {
    const ev = snap.val() as ShipEvent;
    if (!ev) return;

    // простенька дедуплікація: якщо DOM уже відповідає ships-стану, просто ігноруємо анімацію
    // але зазвичай нам треба показати ефект:
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
      // звичайний рух без спецефектів
      const cell = pickCell(ev.to);
      const btn = findShipBtn(ev.shipId);
      if (cell && btn) cell.appendChild(btn);
    }

    // опційне авто-прибирання старих подій (на клієнті)
    setTimeout(() => {
      remove(ref(database, `rooms/${roomId}/events/${ev.id}`)).catch(() => {});
    }, ev.ttl ?? 120000);
  });
}

/* ===== Локальні DOM-утиліти (мінімум) ===== */
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

/* Дзеркальна анімація «простий поверх mother і зник» */
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

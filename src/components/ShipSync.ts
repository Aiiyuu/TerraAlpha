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

type ShipMoveDetail = {
  shipQa: string | null;
  fromIndex: number | null;
  toIndex: string;
  usedStep: number;
  finalizedQa?: string | null;
  finalizedToIndex?: string | null;
  moveKind?: MoveType;
};

type FirebasePatch = Record<string, unknown>;

function inferType(detail: ShipMoveDetail): MoveType {
  if (detail.moveKind) return detail.moveKind;
  if (detail.finalizedQa && detail.finalizedToIndex === 'final-0') {
    if (detail.finalizedQa === detail.shipQa) return 'overMother';
    return 'replaceOwn';
  }
  if (detail.toIndex === '0' || /final-0/.test(detail.toIndex)) return 'finalize';
  return 'move';
}

export function initShipSync(roomId: string) {
  document.addEventListener(
    'shipmove:done',
    (ev: Event) => {
      void (async () => {
        const e = ev as CustomEvent<ShipMoveDetail>;
        const d = e.detail;

        const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
        const type = inferType(d);
        const side: Side = d.shipQa?.startsWith('p1-') ? 'left' : 'right';
        const from =
          d.fromIndex === null ? null : d.fromIndex === 27 ? 'final-0' : `field-${d.fromIndex}`;

        const toRaw =
          d.toIndex === '0'
            ? 'final-0'
            : /^\d+$/.test(d.toIndex)
            ? `field-${d.toIndex}`
            : d.toIndex;

        const normTo =
          toRaw === 'field-25' ? 'final-2' :
          toRaw === 'field-26' ? 'final-1' :
          toRaw;

        const shipId = d.shipQa || '';

        const shipsPathMover = `rooms/${roomId}/ships/${side}/${shipId}`;
        const eventPath = `rooms/${roomId}/events/${id}`;

        const patch: FirebasePatch = {
          [eventPath]: {
            id,
            type,
            side,
            shipId,
            from,
            to: normTo,
            usedStep: d.usedStep,
            ts: serverTimestamp(),
            ttl: 120000,
            applied: true,
          },
        };

        if (type === 'overMother') {
          (patch as Record<string, unknown>)[shipsPathMover] = 'final-0';
        } else if (type === 'replaceOwn') {
          (patch as Record<string, unknown>)[shipsPathMover] = normTo;
          if (d.finalizedQa) {
            const finSide: Side = d.finalizedQa.startsWith('p1-') ? 'left' : 'right';
            (patch as Record<string, unknown>)[`rooms/${roomId}/ships/${finSide}/${d.finalizedQa}`] =
              'final-0';
          }
        } else {
          (patch as Record<string, unknown>)[shipsPathMover] = normTo;
        }

        await update(ref(database), patch);
      })();
    },
    false,
  );

  const eventsRef = ref(database, `rooms/${roomId}/events`);
  onChildAdded(eventsRef, async (snap) => {
    const ev = snap.val() as ShipEvent | null;
    if (!ev) return;

    try {
      if (ev.type === 'replaceOwn') {
        const cell = pickCell(ev.to);
        const outBtn = cell?.querySelector<HTMLElement>('.cell-btn:not([data-qa$="cell-8"])');
        const motherBtn = findShipBtn(ev.shipId);
        if (cell && outBtn && motherBtn) {
          await runShipReplace({ cellEl: cell, outBtn, motherBtn, spinMs: 500, popMs: 180 });
        }
      } else if (ev.type === 'overMother') {
        const cell = pickCell(ev.to);
        const simpleBtn = findShipBtn(ev.shipId);
        if (cell && simpleBtn) {
          await runSimpleOverMother(cell, simpleBtn);
        }
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
        remove(ref(database, `rooms/${roomId}/events/${ev.id}`)).catch(() => {
        });
      }, ev.ttl ?? 120000);
    }
  });
}

function pickCell(pos: string): HTMLElement | null {
  if (/^final-(0|1|2)$/.test(pos)) {
    return (
      document.querySelector<HTMLElement>(`.board [data-qa="${pos}"]`) ||
      document.getElementById(pos)
    );
  }

  const id = pos.replace(/^field-/, '');

  if (id === '25') {
    return (
      document.querySelector<HTMLElement>('.board [data-qa="final-2"]') ||
      document.getElementById('final-2')
    );
  }

  if (id === '26') {
    return (
      document.querySelector<HTMLElement>('.board [data-qa="final-1"]') ||
      document.getElementById('final-1')
    );
  }

  return (
    document.querySelector<HTMLElement>(`.board [data-qa="field-${id}"]`) ||
    document.querySelector<HTMLElement>(`.board [data-qa="cell-${id}"]`) ||
    document.querySelector<HTMLElement>(`.board [data-qa="${id}"]`) ||
    document.querySelector<HTMLElement>(`.board .cell[data-index="${id}"]`) ||
    document.getElementById(`field-${id}`) ||
    document.getElementById(`cell-${id}`)
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
    const end = () => {
      if (done) return;
      done = true;
      el.removeEventListener('animationend', end);
      res();
    };
    el.addEventListener('animationend', end, { once: true });
    setTimeout(end, timeout + 50);
  });
}

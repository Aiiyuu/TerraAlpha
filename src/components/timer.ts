import { helper, HELPER_TIMER_WARNING_THRESHOLD } from "../config";
import { HelperTypes, triggerHelper } from "./helper";

const timer: HTMLElement | null = document.getElementById("timer");
let timerSpanList: HTMLElement[] = [];
const SPAN_HEIGHT = 34.5;
if (!timer) throw new Error("Timer is not found");

export function setupTimer() {
  const timerTextWrapper = document.createElement("div");
  timerTextWrapper.classList.add("timer-text");

  const timerSubWrapper1 = document.createElement("div");
  timerSubWrapper1.classList.add("timer-text-list");

  const timerSubWrapper2 = document.createElement("div");
  timerSubWrapper2.classList.add("timer-text-list");

  for (let i = 9; i >= 0; i--) {
    const span = document.createElement("span");
    span.innerText = String(i);
    timerSubWrapper1.appendChild(span.cloneNode(true));
    timerSubWrapper2.appendChild(span);
  }

  const anotherWrapper1 = document.createElement("div");
  anotherWrapper1.appendChild(timerSubWrapper1);

  const anotherWrapper2 = document.createElement("div");
  anotherWrapper2.appendChild(timerSubWrapper2);

  timerTextWrapper.appendChild(anotherWrapper1);
  timerTextWrapper.appendChild(anotherWrapper2);

  timer!.appendChild(timerTextWrapper);
  updateTimerLook(60);
}

function updateTimerLook(time: number) {
  if (!timerSpanList.length) {
    timerSpanList = [
      ...document.querySelectorAll(".timer-text-list"),
    ] as HTMLElement[];
  }

  timerSpanList.forEach((list, index) => {
    let num: number;
    if (time < 10 && index === 0) {
      num = 0;
    } else if (time < 10 && index === 1) {
      num = time;
    } else {
      num = Number(String(time).at(index));
    }
    list.style.top = `-${(9 - num) * SPAN_HEIGHT}px`;
  });
}

type TimerCallbacks = {
  onExpire?: () => void;
  onThreshold?: () => void;
  onTick?: (remainingSec: number) => void;
  thresholdSeconds?: number;
};

export function createTimer(
  startTimePoint: string,
  timeDurationSec: number,
  isCurrentPlayer: boolean,
  callbacks?: TimerCallbacks
): () => void {
  if (timer!.classList.contains("timer--isActive")) return () => false;

  const startDate = new Date(startTimePoint);
  const endDate = new Date(startDate.getTime() + timeDurationSec * 1000);
  const threshold = Math.max(0, callbacks?.thresholdSeconds ?? 20);
  let thresholdFired = false;

  const interval = setInterval(() => {
    const delay = Math.ceil((endDate.getTime() - Date.now()) / 1000);

    if (isCurrentPlayer && delay === HELPER_TIMER_WARNING_THRESHOLD / 1000) {
      triggerHelper({
        duration: HELPER_TIMER_WARNING_THRESHOLD,
        text: helper("helper.timerWarning"),
        type: HelperTypes.HELPER_WARNING,
      });
    }

    if (!thresholdFired && delay <= threshold) {
      thresholdFired = true;
      callbacks?.onThreshold?.();
    }

    callbacks?.onTick?.(Math.max(0, delay));
    updateTimerLook(Math.max(0, delay));

    if (delay <= 0) {
      clearInterval(interval);
      callbacks?.onExpire?.();
    }
  }, 1000);

  return () => {
    clearInterval(interval);
  };
}

let prevTimerInterval: (() => void) | null = null;
const CURRENT_ROUND_DURATION = 60;

export function detectTimerChanges(
  prevTimer: undefined | string,
  currTimer: string,
  isCurrentPlayer: boolean,
  options?: TimerCallbacks
) {
  if (prevTimer === currTimer) return;

  if (prevTimerInterval) {
    prevTimerInterval();
    prevTimerInterval = null;
  }

  prevTimerInterval = createTimer(
    currTimer,
    CURRENT_ROUND_DURATION,
    isCurrentPlayer,
    options
  );
}

export function extendTimer(currentTime: string, extraTime: number): string {
  const currentEnd = new Date(currentTime);
  const newEnd = new Date(currentEnd.getTime() + extraTime);
  
  return newEnd.toISOString();
}

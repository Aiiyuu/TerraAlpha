const timer: HTMLElement | null = document.getElementById("timer");
let timerSpanList: HTMLElement[] = [];

const SPAN_HEIGHT = 38;

if (!timer) {
  throw new Error("Timer is not found");
}

/**
 * This function sets up the timer by creating its HTML markup.
 */
export function setupTimer() {
  const timerTextWrapper: HTMLDivElement = document.createElement("div");
  timerTextWrapper.classList.add("timer-text");

  const timerSubWrapper1: HTMLDivElement = document.createElement("div");
  timerSubWrapper1.classList.add("timer-text-list");

  const timerSubWrapper2: HTMLDivElement = document.createElement("div");
  timerSubWrapper2.classList.add("timer-text-list");

  for (let i = 9; i >= 0; i--) {
    const span: HTMLSpanElement = document.createElement("span");
    span.innerText = String(i);

    timerSubWrapper1.appendChild(span.cloneNode(true));
    timerSubWrapper2.appendChild(span);
  }

  const anotherWrapper1: HTMLDivElement = document.createElement("div");
  anotherWrapper1.appendChild(timerSubWrapper1);

  const anotherWrapper2: HTMLDivElement = document.createElement("div");
  anotherWrapper2.appendChild(timerSubWrapper2);

  timerTextWrapper.appendChild(anotherWrapper1);
  timerTextWrapper.appendChild(anotherWrapper2);

  timer?.appendChild(timerTextWrapper);
  updateTimerLook(60);
}

/**
 * This function updates the appearance of the timer and its state every second.
 * It also finds the `timerSpanList` if it has not been found yet.
 * @param time
 */
export function updateTimerLook(time: number) {
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

/**
 * Creates a timer that triggers a callback after a specified amount of time.
 */
export function createTimer(
  startTimePoint: string,
  timeDuration: number,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  callback: Function
): () => void {
  if (timer?.classList.contains("timer--isActive")) return () => false;

  const startDate = new Date(startTimePoint);
  const endDate = new Date(startDate.getTime() + timeDuration * 1000);

  const interval = setInterval(() => {
    const delay = Math.ceil((endDate.getTime() - Date.now()) / 1000);
    console.log(delay);

    updateTimerLook(delay);

    if (delay <= 0) {
      clearInterval(interval);
      callback();
    }
  }, 1000);

  return () => {
    clearInterval(interval);
  };
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
let prevTimerInterval: Function | null = null;

const CURRENT_ROUND_DURATION = 60;

/* Manage timer detection */
export function detectTimerChanges(
  prevTimer: undefined | string,
  currTimer: string
) {
  if (prevTimer === currTimer) return;

  if (prevTimerInterval) {
    prevTimerInterval();
    prevTimerInterval = null;
  }

  prevTimerInterval = createTimer(currTimer, CURRENT_ROUND_DURATION, () => {
    alert("Time is up after rolling dice");
  });
}

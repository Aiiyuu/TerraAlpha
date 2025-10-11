const timer: HTMLElement | null = document.getElementById('timer');
let timerSpanList: HTMLElement[] = [];

const SPAN_HEIGHT = 45;

if (!timer) {
  throw new Error('Timer is not found');
}

/**
 * This function sets up the timer by creating its HTML markup.
 */
export function setupTimer() {
  const timerTextWrapper: HTMLDivElement = document.createElement('div');
  timerTextWrapper.classList.add('timer-text');

  const timerSubWrapper1: HTMLDivElement = document.createElement('div');
  timerSubWrapper1.classList.add('timer-text-list');

  const timerSubWrapper2: HTMLDivElement = document.createElement('div');
  timerSubWrapper2.classList.add('timer-text-list');

  for (let i = 9; i >= 0; i--) {
    const span: HTMLSpanElement = document.createElement('span');
    span.innerText = String(i);

    timerSubWrapper1.appendChild(span.cloneNode(true));
    timerSubWrapper2.appendChild(span);
  }

  const anotherWrapper1: HTMLDivElement = document.createElement('div');
  anotherWrapper1.appendChild(timerSubWrapper1);

  const anotherWrapper2: HTMLDivElement = document.createElement('div');
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
    timerSpanList = [...document.querySelectorAll('.timer-text-list')] as HTMLElement[];
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
 *
 * @param {number} time - The duration of the timer in seconds before the callback is triggered.
 * @param {Function} callback - The function to execute once the timer expires. This will receive the arguments provided in `...args`.
 * @param {...*} args - Optional additional arguments to pass to the callback when the timer expires.
 *
 * @returns {Function} A function that can be called to stop and reset the timer before it expires.
 *
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function createTimer(time: number, callback: Function, ...args: unknown[]) {
  if (timer?.classList.contains('timer--isActive')) return () => false;

  updateTimerLook(time);

  let timerId: ReturnType<typeof setTimeout>;
  let intervalId: ReturnType<typeof setInterval>;
  let currentTime = time;

  timer?.classList.add('timer--isActive');

  // Start the timer
  (function () {
    timerId = setTimeout(() => {
      clearInterval(intervalId);
      timer?.classList.remove('timer--isActive');
      callback(...args);
    }, time * 1000 + 1000);

    intervalId = setInterval(() => {
      currentTime--;
      updateTimerLook(currentTime);
    }, 1000);
  })();

  // Return a function to clear the timer
  return () => {
    if (timerId) {
      clearTimeout(timerId);
      clearInterval(intervalId);
      timer?.classList.remove('timer--isActive');
    }
  };
}
import {
  helperOffSVG,
  helperOnSVG,
  HelperRobotType,
  helperSVG,
} from "./helperSVG";
import helperSoundSrc from "../assets/sounds/helper.mp3";
import { createSound } from "./sound";
import {
  helper as getHelperText,
  HELPER_INTRODUCTION_DURATION,
} from "../config";

const helper = document.getElementById("helper-container") as HTMLElement;
const helperIcon = document.getElementById("helper-icon") as HTMLElement;
const helperText = document.getElementById("helper-text") as HTMLElement;
const helperBtns = document.getElementById("helper-btns") as HTMLElement;
const helperBar = document.getElementById("helper-progress-bar") as HTMLElement;
const acceptBtn = document.getElementById("helper-accept-btn") as HTMLElement;
const rejectBtn = document.getElementById("helper-reject-btn") as HTMLElement;

type HelperArgs = {
  duration?: number;
  text: string;
  type: HelperTypes;
  onAccept?: () => void;
  onReject?: () => void;
  priority?: number;
  dedupeKey?: string;
  delayBeforeShow?: number;
};

export enum HelperTypes {
  HELPER_HINT = "helper_hint",
  HELPER_WARNING = "helper_warning",
  HELPER_OFFER = "helper_offer",
  HELPER_INFORM = "helper_inform",
}

const helperFaceTypes: Record<HelperTypes, HelperRobotType> = {
  [HelperTypes.HELPER_HINT]: HelperRobotType.REGULAR,
  [HelperTypes.HELPER_WARNING]: HelperRobotType.ANGRY,
  [HelperTypes.HELPER_OFFER]: HelperRobotType.OFFER,
  [HelperTypes.HELPER_INFORM]: HelperRobotType.INFORM,
};

const DEFAULT_DURATION = 3000;
const INTERVAL_BETWEEN = 500;
const WORD_PRINT_INTERVAL = 20;
const DEDUPE_TTL = 3000;

const { startSound, stopSound } = createSound({
  src: helperSoundSrc,
  loudness: 0.2,
  infinite: true,
});

const queue: HelperArgs[] = [];
let visible = false;
let current: {
  timeoutId: ReturnType<typeof setTimeout> | null;
  onAccept?: () => void;
  onReject?: () => void;
  args: HelperArgs;
} | null = null;

const dedupeMap = new Map<string, number>();

let isCalledOnce = false;
let introShown = false; // NEW

export function setUpHelperBtn() {
  const helperBtn = document.getElementById("helper-btn") as HTMLElement;
  const headerHelperBtn = document.getElementById(
    "header-hint-btn"
  ) as HTMLElement;

  const toggleHelperState = (btn: HTMLElement) => {
    const isDisabled = getIsDisabled();
    localStorage.setItem("helperIsDisabled", String(!isDisabled));

    btn.innerHTML = isDisabled ? helperOnSVG : helperOffSVG;
  };

  helperBtn.addEventListener("click", () => toggleHelperState(helperBtn));

  if (!isCalledOnce) {
    headerHelperBtn.addEventListener("click", () =>
      toggleHelperState(headerHelperBtn)
    );
    isCalledOnce = true;
  }

  const isDisabled = getIsDisabled();
  headerHelperBtn.innerHTML = isDisabled ? helperOffSVG : helperOnSVG;
}

export function triggerHelper(rawArgs: HelperArgs) {
  const args: HelperArgs = {
    duration: rawArgs.duration ?? DEFAULT_DURATION,
    text: rawArgs.text,
    type: rawArgs.type,
    onAccept: rawArgs.onAccept,
    onReject: rawArgs.onReject,
    priority: rawArgs.priority ?? 0,
    dedupeKey: rawArgs.dedupeKey,
    delayBeforeShow: rawArgs.delayBeforeShow ?? 0,
  };

  if (getIsDisabled() && args.type === HelperTypes.HELPER_HINT) return;

  if (args.dedupeKey) {
    const now = Date.now();
    const last = dedupeMap.get(args.dedupeKey) ?? 0;
    if (now - last < DEDUPE_TTL) return;
    dedupeMap.set(args.dedupeKey, now);
  }

  const schedule = () => {
    if (!visible) {
      setTimeout(() => showNow(args), args.delayBeforeShow);
      return;
    }

    const isHigherPriority = args.priority! > (current?.args.priority ?? 0);
    if (isHigherPriority) {
      preemptAndShow(args);
      return;
    }

    queue.push(args);
    queue.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
  };

  schedule();
}

function preemptAndShow(args: HelperArgs) {
  if (current?.timeoutId) clearTimeout(current.timeoutId);
  cleanupChoiceListeners(current?.onAccept, current?.onReject);
  hideImmediate();
  setTimeout(() => showNow(args), args.delayBeforeShow);
}

function showNow(args: HelperArgs) {
  visible = true;
  startSound();
  setHelperState(helperFaceTypes[args.type]);
  helper.classList.add("visible");
  helperText.innerText = "";
  helperBar.style.animation = "none";
  void helperBar.offsetWidth;
  helperBar.style.animation = `helper-bar ${args.duration}ms linear`;

  if (args.type === HelperTypes.HELPER_OFFER) {
    helperBtns.classList.add("visible");
  } else {
    helperBtns.classList.remove("visible");
  }

  let i = 0;
  const text = args.text;
  const printer = setInterval(() => {
    helperText.innerText = text.slice(0, i + 1);
    i++;
    if (i >= text.length) clearInterval(printer);
  }, WORD_PRINT_INTERVAL);

  const onAcceptClick = () => {
    hideAndNext();
    args.onAccept?.();
  };
  const onRejectClick = () => {
    hideAndNext();
    args.onReject?.();
  };

  if (args.type === HelperTypes.HELPER_OFFER) {
    acceptBtn.addEventListener("click", onAcceptClick);
    rejectBtn.addEventListener("click", onRejectClick);
  }

  const timeoutId = setTimeout(() => {
    hideAndNext();
  }, args.duration);

  current = {
    timeoutId,
    onAccept: onAcceptClick,
    onReject: onRejectClick,
    args,
  };
}

function hideAndNext() {
  cleanupChoiceListeners(current?.onAccept, current?.onReject);
  hideImmediate();
  setTimeout(() => {
    const next = queue.shift();
    if (next) showNow(next);
  }, INTERVAL_BETWEEN);
}

function hideImmediate() {
  stopSound();
  helper.classList.remove("visible");
  helperBtns.classList.remove("visible");
  visible = false;
  current = null;
}

function cleanupChoiceListeners(onAccept?: () => void, onReject?: () => void) {
  if (onAccept) acceptBtn.removeEventListener("click", onAccept);
  if (onReject) rejectBtn.removeEventListener("click", onReject);
}

function setHelperState(type: HelperRobotType) {
  Object.values(HelperRobotType).forEach((value) =>
    helperIcon.classList.remove(value)
  );
  helperIcon.classList.add(type);
  helperIcon.innerHTML = helperSVG(type);
}

function getIsDisabled(): boolean {
  return localStorage.getItem("helperIsDisabled") === "true";
}

export function runIntroductionHelper() {
  if (introShown) return;
  introShown = true;

  const blocks = 9;
  const stepDelay = HELPER_INTRODUCTION_DURATION + INTERVAL_BETWEEN;

  let currentBlock = 0;

  triggerHelper({
    duration: HELPER_INTRODUCTION_DURATION,
    text: getHelperText(`helper.blocks.${currentBlock + 1}`),
    type: HelperTypes.HELPER_HINT,
  });

  currentBlock++;

  const intervalId = setInterval(() => {
    triggerHelper({
      duration: HELPER_INTRODUCTION_DURATION,
      text: getHelperText(`helper.blocks.${currentBlock + 1}`),
      type: HelperTypes.HELPER_HINT,
    });

    currentBlock++;

    if (currentBlock >= blocks) {
      clearInterval(intervalId);
    }
  }, stepDelay);
}

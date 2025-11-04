import { HelperRobotType, helperSVG } from "./helperSVG";
import helperSoundSrc from "../assets/sounds/helper.mp3";
import { createSound } from "./sound";

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
const INTERFAL_BETWEEN_HELPER = 500;
const WORD_PRINT_INTERVAL = 20;
const queue: HelperArgs[] = [];

const { startSound, stopSound } = createSound({
  src: helperSoundSrc,
  loudness: 0.2,
  infinite: true,
});

export function setUpHelperBtn() {
  const isOff = getIsDisabled();
  const helperBtn = document.getElementById("helper-btn") as HTMLElement;

  if (isOff) helperBtn.classList.add("is-off");

  helperBtn.addEventListener("click", () => {
    const isDisabled = getIsDisabled();
    localStorage.setItem("helperIsDisabled", String(!isDisabled));

    if (!isDisabled) {
      helperBtn.classList.add("is-off");
    } else {
      helperBtn.classList.remove("is-off");
    }
  });
}

export function triggerHelper({
  duration = DEFAULT_DURATION,
  text,
  type,
  onAccept,
  onReject,
}: HelperArgs) {
  // Skip hint if disabled
  if (getIsDisabled() && type === HelperTypes.HELPER_HINT) return;

  // Queue if another helper is already visible
  if (helper.classList.contains("visible")) {
    queue.push({ duration, text, type, onAccept, onReject });
    return;
  }

  let timeOutId: ReturnType<typeof setTimeout> | null = null;

  const cleanupChoiceListeners = () => {
    acceptBtn.removeEventListener("click", onAcceptClick);
    rejectBtn.removeEventListener("click", onRejectClick);
  };

  const triggerNextHelper = () => {
    if (queue.length > 0) {
      const next = queue.shift()!;
      setTimeout(() => triggerHelper(next), INTERFAL_BETWEEN_HELPER);
    }
  };

  const hideAndContinue = () => {
    hideHelper();
    cleanupChoiceListeners();
    if (timeOutId) clearTimeout(timeOutId);
    triggerNextHelper();
  };

  const onAcceptClick = () => {
    hideAndContinue();
    if (onAccept) onAccept();
  };

  const onRejectClick = () => {
    hideAndContinue();
    if (onReject) onReject();
  };

  if (type === HelperTypes.HELPER_OFFER) {
    acceptBtn.addEventListener("click", onAcceptClick);
    rejectBtn.addEventListener("click", onRejectClick);
  }

  displayHelper(text, type, duration);

  // Schedule auto-hide if no user interaction
  timeOutId = setTimeout(() => {
    hideHelper();
    cleanupChoiceListeners();
    triggerNextHelper();
  }, duration);
}

function setHelperState(type: HelperRobotType) {
  Object.values(HelperRobotType).forEach((value) => {
    helperIcon.classList.remove(value);
  });

  helperIcon.classList.add(type);
  helperIcon.innerHTML = helperSVG(type);
}

function displayHelper(
  text: HelperArgs["text"],
  type: HelperTypes,
  duration: HelperArgs["duration"]
) {
  startSound();
  setHelperState(helperFaceTypes[type]);

  helper.classList.add("visible");
  helperText.innerText = "";

  helperBar.style.animation = "none";
  void helperBar.offsetWidth; // Restart CSS animation
  helperBar.style.animation = `helper-bar ${duration}ms linear`;

  if (type === HelperTypes.HELPER_OFFER) {
    helperBtns.classList.add("visible");
  }

  let i = 0;
  const interval = setInterval(() => {
    helperText.innerText = text.slice(0, i + 1);
    i++;

    if (i >= text.length) {
      clearInterval(interval);
    }
  }, WORD_PRINT_INTERVAL);
}

function hideHelper() {
  stopSound();
  helper.classList.remove("visible");
  helperBtns.classList.remove("visible");
}

function getIsDisabled(): boolean {
  return localStorage.getItem("helperIsDisabled") === "true";
}

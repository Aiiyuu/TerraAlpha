import mutedIcon from "../assets/icons/muted.png";
import unmutedIcon from "../assets/icons/unmuted.png";

const AudioContextClass =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  window.AudioContext ?? (window as any).webkitAudioContext;

const audioContext: AudioContext = new AudioContextClass();
const masterGain = audioContext.createGain();

masterGain.gain.value = 1;
masterGain.connect(audioContext.destination);

export function getAudioContext(): AudioContext {
  return audioContext;
}

export function getMasterGain(): GainNode {
  return masterGain;
}

function setMuted(muted: boolean): void {
  masterGain.gain.value = muted ? 0 : 1;
}

export function setupMuteBtn() {
  const muteBtn = document.getElementById(
    "mute-btn"
  ) as HTMLButtonElement | null;
  if (!muteBtn) return; // 🔹 якщо кнопки немає — не виконуємо нічого

  let isMuted = false;

  const storedMuteState = localStorage.getItem("is-muted");
  if (storedMuteState !== null) {
    isMuted = JSON.parse(storedMuteState);
  }

  setMuted(isMuted);

  muteBtn.addEventListener("click", () => {
    if (audioContext.state === "suspended") audioContext.resume();
    isMuted = !isMuted;

    localStorage.setItem("is-muted", String(isMuted));
    setMuted(isMuted);

    const img: HTMLImageElement | null = muteBtn.querySelector("img");

    if (!img) return;

    if (isMuted) img.src = mutedIcon;
    else img.src = unmutedIcon;
  });
}

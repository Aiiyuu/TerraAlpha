const AudioContextClass = window.AudioContext ?? window.webkitAudioContext;

const audioContext = new AudioContextClass();

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
  const muteBtn = document.getElementById("mute-btn") as HTMLButtonElement;
  let isMuted = false;

  // Initialize mute state from localStorage
  const storedMuteState = localStorage.getItem("is-muted");
  if (storedMuteState !== null) {
    isMuted = JSON.parse(storedMuteState);
  }
  
  muteBtn.setAttribute("data-is-muted", String(isMuted));
  setMuted(isMuted);

  muteBtn.addEventListener("click", () => {
    isMuted = !isMuted;
    muteBtn.setAttribute("data-is-muted", String(isMuted));
    localStorage.setItem("is-muted", String(isMuted));

    setMuted(isMuted);
  });
}
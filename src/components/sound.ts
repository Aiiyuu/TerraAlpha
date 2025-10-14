import type { SoundOptions } from "../types/soundOptions";

type CreateSoundResult = {
  startSound: () => void;
  stopSound: () => void;
};

/**
 * Creates a sound buffer with the provided settings and returns an object
 * containing two functions: one to start and one to stop the sound.
 * @returns {Object} An object with functions to start and stop the sound.
 */
export function createSound({
  src,
  loudness = 1,
  infinite = false,
}: SoundOptions): CreateSoundResult {
  // Audio context for managing sound
  const audioContext = new (window.AudioContext || window.AudioContext)();

  let bufferSourceNode: AudioBufferSourceNode | null = null;
  let gainNode: GainNode | null = null;

  // Function to load the audio buffer
  const loadAudioBuffer = async (src: string): Promise<AudioBuffer> => {
    const response = await fetch(src);
    const arrayBuffer = await response.arrayBuffer();
    return audioContext.decodeAudioData(arrayBuffer);
  };

  // Function to start the sound
  const startSound = async () => {
    // Create new source node and gain node
    const buffer = await loadAudioBuffer(src);
    bufferSourceNode = audioContext.createBufferSource();
    gainNode = audioContext.createGain();

    // Set the loudness
    gainNode.gain.value = loudness;

    // Connect nodes
    bufferSourceNode.buffer = buffer;
    bufferSourceNode.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Handle infinite loop
    if (infinite) {
      bufferSourceNode.loop = true;
    }

    // Start the sound
    bufferSourceNode.start();
  };

  // Function to stop the sound
  const stopSound = () => {
    if (!bufferSourceNode) return;

    bufferSourceNode.stop();
  };

  return { startSound, stopSound };
}

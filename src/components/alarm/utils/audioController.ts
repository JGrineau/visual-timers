// utils/audioController.ts

let currentAudio: HTMLAudioElement | null = null;

export function playSound(src: string) {
  // Stop any currently playing audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  // Create and play new audio
  currentAudio = new Audio(src);
  currentAudio.play().catch((err) => {
    console.warn("Audio failed to play:", err);
  });
}

export function stopSound() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

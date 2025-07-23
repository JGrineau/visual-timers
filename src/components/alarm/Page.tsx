import { useEffect, useRef } from "react";

type AlarmProps = {
  play: boolean;
  selectedSound: string;
  onSoundChange: (sound: string) => void;
};

const soundOptions = [
  { label: "Bell", src: "/Alarm.mp3" },
  { label: "Digital", src: "/AlarmDigital.mp3" },
  { label: "Chime", src: "/AlarmChime.mp3" },
  // Add more sounds as needed, make sure files exist in /public
];

export default function Alarm({
  play,
  selectedSound,
  onSoundChange,
}: AlarmProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play when "play" becomes true (for timer end)
  useEffect(() => {
    if (play && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }, [play, selectedSound]);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold mb-1 text-text">
        Select Alarm Sound
      </label>
      <select
        value={selectedSound}
        onChange={(e) => onSoundChange(e.target.value)}
        className="w-full px-4 py-2 rounded-md bg-background border border-border text-text focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
      >
        {soundOptions.map((sound) => (
          <option key={sound.src} value={sound.src}>
            {sound.label}
          </option>
        ))}
      </select>

      <button
        className="mt-2 px-4 py-2 bg-primary text-white rounded"
        onClick={() => {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          }
        }}
      >
        Test Sound
      </button>

      <audio ref={audioRef} src={selectedSound} preload="auto" />
    </div>
  );
}

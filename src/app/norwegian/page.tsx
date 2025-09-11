"use client";
import { useState, useRef, useEffect } from "react";
import { RotateCcw } from "lucide-react";
import SettingsPanel from "@/components/settings-panel/Page";
import "../../app/globals.css";

const HARD_TIME = 4 * 60; // 4 minutes
const RELAX_TIME = 4 * 60; // 4 minutes
const TOTAL_ROUNDS = 4;

type Phase = "hard" | "relax";

export default function Norwegian4x4() {
  const [secondsLeft, setSecondsLeft] = useState(HARD_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<Phase>("hard");
  const [round, setRound] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            handlePhaseEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, phase, round]);

  const handlePhaseEnd = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch((e) => console.warn("Audio play blocked:", e));
    }

    if (phase === "hard") {
      // Switch to relax
      setPhase("relax");
      setSecondsLeft(RELAX_TIME);
    } else {
      // End of relax
      if (round < TOTAL_ROUNDS) {
        setRound((r) => r + 1);
        setPhase("hard");
        setSecondsLeft(HARD_TIME);
      } else {
        // All rounds complete
        setIsRunning(false);
        setIsComplete(true);
      }
    }
  };

  const formatTime = (secs: number) =>
    `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(
      secs % 60
    ).padStart(2, "0")}`;

  const handleStart = () => {
    if (!isRunning && !isComplete) setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current!);
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current!);
    setSecondsLeft(HARD_TIME);
    setPhase("hard");
    setRound(1);
    setIsComplete(false);
  };

  const handleStopAlarm = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsComplete(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text">
      {/* Phase + Round Display */}
      <div className="text-2xl font-bold mt-6">
        {phase === "hard" ? "Hard" : "Relax"} – Round {round}/{TOTAL_ROUNDS}
      </div>

      {/* Timer Display */}
      <div className="flex justify-center font-mono m-6 text-7xl sm:text-9xl">
        {formatTime(secondsLeft)}
      </div>

      {/* Controls */}
      <div className="flex m-6 justify-center gap-4">
        <button
          onClick={isRunning ? handleStop : handleStart}
          className="px-6 py-2 border-3 border-border rounded-2xl text-text bg-transparent hover:bg-primary hover:text-white transition"
          disabled={isComplete}
        >
          {isRunning ? "Pause" : "Start"}
        </button>

        <button
          onClick={handleReset}
          className="p-2 text-text rounded-full transition-transform duration-200 hover:scale-110"
          title="Reset Timer"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>

      {/* Beep sound */}
      <audio ref={audioRef} src="/Digital.mp3" preload="auto" />

      {/* Complete Popup */}
      {isComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-background-light rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
            <h2 className="text-2xl font-bold mb-3 text-text">
              Workout Complete!
            </h2>
            <p className="text-sm mb-6 text-text">
              You’ve finished all 4 rounds of Norwegian 4x4 🎉
            </p>
            <button
              onClick={handleStopAlarm}
              className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-accent transition"
            >
              Stop Alarm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

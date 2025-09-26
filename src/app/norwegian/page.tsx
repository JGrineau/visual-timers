"use client";
import { useState, useRef, useEffect } from "react";
import { RotateCcw } from "lucide-react";
import SettingsPanel from "@/components/settings-panel/Page";
import "../../app/globals.css";

type Phase = "hard" | "relax";

export default function Norwegian4x4() {
  // Default values
  const [hardTime, setHardTime] = useState(4); // minutes
  const [relaxTime, setRelaxTime] = useState(4); // minutes
  const [totalRounds, setTotalRounds] = useState(4);

  const [secondsLeft, setSecondsLeft] = useState(hardTime * 60);
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
      setSecondsLeft(relaxTime * 60);
    } else {
      // End of relax
      if (round < totalRounds) {
        setRound((r) => r + 1);
        setPhase("hard");
        setSecondsLeft(hardTime * 60);
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
    setSecondsLeft(hardTime * 60);
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

  // const handleApplySettings = (
  //   _size: number,
  //   _duration: number,
  //   _sound: string,
  //   times: {
  //   pomodoro: number;
  //   shortBreak: number;
  //   longBreak: number;
  //   hard: number;
  //   relax: number;
  //   rounds: number;
  //   }
  // ) => {
  //   // Grab from localStorage (already stored by SettingsPanel)
  //   const savedHard = localStorage.getItem("norwegianHard");
  //   const savedRelax = localStorage.getItem("norwegianRelax");
  //   const savedRounds = localStorage.getItem("norwegianRounds");

  //   const newHard = savedHard ? parseInt(savedHard, 10) : hardTime;
  //   const newRelax = savedRelax ? parseInt(savedRelax, 10) : relaxTime;
  //   const newRounds = savedRounds ? parseInt(savedRounds, 10) : totalRounds;

  //   setHardTime(newHard);
  //   setRelaxTime(newRelax);
  //   setTotalRounds(newRounds);

  //   // Reset timer with new settings
  //   setIsRunning(false);
  //   setPhase("hard");
  //   setRound(1);
  //   setSecondsLeft(newHard * 60);
  //   setIsComplete(false);
  // };

  const handleApplySettings = (
    _size: number,
    _duration: number,
    _sound: string,
    times: {
      pomodoro: number;
      shortBreak: number;
      longBreak: number;
      hard: number;
      relax: number;
      rounds: number;
    }
  ) => {
    // Use values directly from SettingsPanel
    const newHard = times.hard;
    const newRelax = times.relax;
    const newRounds = times.rounds;

    setHardTime(newHard);
    setRelaxTime(newRelax);
    setTotalRounds(newRounds);

    // Reset timer with new settings
    setIsRunning(false);
    setPhase("hard");
    setRound(1);
    setSecondsLeft(newHard * 60);
    setIsComplete(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text">
      {/* Phase + Round Display */}
      <div className="text-2xl font-bold mt-6">
        {phase === "hard" ? "Hard" : "Relax"} – Round {round}/{totalRounds}
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

        {/* Settings Panel */}
        <SettingsPanel
          size={0}
          duration={0}
          onApply={handleApplySettings}
          isNorwegianPage
        />
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
              You’ve finished all {totalRounds} rounds of Norwegian 4x4 🎉
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

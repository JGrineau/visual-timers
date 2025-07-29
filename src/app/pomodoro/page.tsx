"use client";
import { useState, useRef, useEffect } from "react";
import { RotateCcw } from "lucide-react";
import "../../app/globals.css";
import SettingsPanel from "@/components/settings-panel/Page";
const DEFAULT_TIME = 25 * 60; // 25 minutes in seconds

export default function Pomodoro() {
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [activeMode, setActiveMode] = useState<Mode>("pomodoro");
  const [selectedSound, setSelectedSound] = useState("/Alarm.mp3");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isComplete, setIsComplete] = useState(false);

  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [shortBreakTime, setShortBreakTime] = useState(5 * 60);
  const [longBreakTime, setLongBreakTime] = useState(10 * 60);

  type Mode = "pomodoro" | "short" | "long";

  // Helper to set the timer to a specific duration (in seconds)
  function setTimeLeft(duration: number) {
    setSecondsLeft(duration);
  }

  useEffect(() => {
    const saved = localStorage.getItem("selectedSound");
    if (saved) setSelectedSound(saved);
  }, []);
  //  Start/stop interval when isRunning changes
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    // Cleanup on unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  // Format seconds as MM:SS
  const formatTime = (secs: number) =>
    `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(
      secs % 60
    ).padStart(2, "0")}`;

  const handleStart = () => {
    if (!isRunning && secondsLeft > 0) {
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current!);
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current!);
    setTimeLeft(DEFAULT_TIME);
  };

  // Handlers for break buttons
  const handlePomodoro = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current!);
    setTimeLeft(pomodoroTime);
    setActiveMode("pomodoro");
  };

  const handleShortBreak = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current!);
    setTimeLeft(shortBreakTime);
    setActiveMode("short");
  };

  const handleLongBreak = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current!);
    setTimeLeft(longBreakTime);
    setActiveMode("long");
  };

  const handleStopAlarm = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsComplete(false); // 🔍 Hide popup
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text">
      {/* Break Buttons */}
      <div className="flex flex-row gap-4 mb-8">
        <button
          className="px-6 py-2 border-3 border-border rounded-2xl text-text bg-transparent hover:text-white hover:bg-primary hover:cursor-pointer transition data-[active=true]:bg-primary data-[active=true]:text-white"
          data-active={activeMode === "pomodoro"}
          onClick={handlePomodoro}
        >
          Pomodoro
        </button>
        <button
          className="px-6 py-2 border-3 border-border rounded-2xl text-text bg-transparent hover:text-white hover:bg-primary hover:cursor-pointer transition data-[active=true]:bg-primary data-[active=true]:text-white"
          data-active={activeMode === "short"}
          onClick={handleShortBreak}
        >
          Short Break
        </button>
        <button
          className="px-6 py-2 border-3 border-border rounded-2xl text-text bg-transparent hover:text-white hover:bg-primary hover:cursor-pointer transition data-[active=true]:bg-primary data-[active=true]:text-white"
          data-active={activeMode === "long"}
          onClick={handleLongBreak}
        >
          Long Break
        </button>
      </div>
      {/* Timer Display */}
      <div className="text-9xl font-mono mb-8">{formatTime(secondsLeft)}</div>
      {/* Start/Pause Button */}
      <div className="flex gap-4">
        <button
          onClick={isRunning ? handleStop : handleStart}
          className={`px-6 py-2 ${
            isRunning
              ? "px-6 py-2 border-3 border-border rounded-2xl text-text bg-transparent hover:bg-accent hover:text-white hover:bg-primary hover:cursor-pointer transition"
              : "px-6 py-2 border-3 border-border rounded-2xl text-text bg-transparent hover:bg-accent hover:text-white hover:bg-primary hover:cursor-pointer transition"
          } text-black rounded`}
          disabled={secondsLeft === 0}
        >
          {isRunning ? "Pause" : "Start"}
        </button>

        {/* Reset Icon Button */}
        <button
          onClick={handleReset}
          className="p-2 hover:cursor-pointer text-text rounded-full transition-transform duration-200 hover:scale-110"
          title="Reset Timer"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
        {/* Settings Panel */}
        <SettingsPanel
          size={100} // Example size, adjust as needed
          duration={secondsLeft}
          isPomodoroPage={true}
          onApply={(newSize, newDuration, newSound, times) => {
            setPomodoroTime(times.pomodoro * 60);
            setShortBreakTime(times.shortBreak * 60);
            setLongBreakTime(times.longBreak * 60);

            // ✅ Update secondsLeft if the mode is currently active
            if (activeMode === "pomodoro") {
              setTimeLeft(times.pomodoro * 60);
            } else if (activeMode === "short") {
              setTimeLeft(times.shortBreak * 60);
            } else if (activeMode === "long") {
              setTimeLeft(times.longBreak * 60);
            }
            if (audioRef.current) {
              audioRef.current.src = newSound;
            }
          }}
        />
        <audio ref={audioRef} src={selectedSound} preload="auto" loop />
      </div>
      {/* Timer Complete Popup */}
      {isComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-background-light rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
            <h2 className="text-2xl font-bold mb-3 text-text">
              ✅ Timer Complete!
            </h2>
            <p className="text-sm mb-6 text-text">
              Your countdown has finished.
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

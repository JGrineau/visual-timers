"use client";
import { useState, useRef, useEffect } from "react";
import { RotateCcw } from "lucide-react";
import "../../app/globals.css";

const DEFAULT_TIME = 25 * 60; // 25 minutes in seconds

export default function Pomodoro() {
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [activeMode, setActiveMode] = useState<Mode>("pomodoro");

  const POMODORO_TIME = 25 * 60;
  const SHORT_BREAK_TIME = 5 * 60;
  const LONG_BREAK_TIME = 10 * 60;

  type Mode = "pomodoro" | "short" | "long";

  // Helper to set the timer to a specific duration (in seconds)
  function setTimeLeft(duration: number) {
    setSecondsLeft(duration);
  }

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
    setTimeLeft(POMODORO_TIME);
    setActiveMode("pomodoro");
  };

  const handleShortBreak = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current!);
    setTimeLeft(SHORT_BREAK_TIME);
    setActiveMode("short");
  };

  const handleLongBreak = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current!);
    setTimeLeft(LONG_BREAK_TIME);
    setActiveMode("long");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text">
      {/* Break Buttons */}
      <div className="flex gap-2 md:gap-4 m-3 justify-center flex-wrap">
        <button
          className="text-md px-3 py-1.5 md:px-6 md:py-2 border-3 border-border rounded-xl text-text bg-transparent hover:text-white hover:bg-primary hover:cursor-pointer transition data-[active=true]:bg-primary data-[active=true]:text-white"
          data-active={activeMode === "pomodoro"}
          onClick={handlePomodoro}
        >
          Pomodoro
        </button>
        <button
          className="text-md px-3 py-1.5 md:px-6 md:py-2 border-3 border-border rounded-xl text-text bg-transparent hover:text-white hover:bg-primary hover:cursor-pointer transition data-[active=true]:bg-primary data-[active=true]:text-white"
          data-active={activeMode === "short"}
          onClick={handleShortBreak}
        >
          Short Break
        </button>
        <button
          className="text-md px-3 py-1.5 md:px-6 md:py-2 border-3 border-border rounded-xl text-text bg-transparent hover:text-white hover:bg-primary hover:cursor-pointer transition data-[active=true]:bg-primary data-[active=true]:text-white"
          data-active={activeMode === "long"}
          onClick={handleLongBreak}
        >
          Long Break
        </button>
      </div>

      {/* Timer Display */}
      <div className="flex justify-center font-mono m-6 text-7xl xs:text-8xl sm:text-9xl md:text-9xl lg:text-9x">
        {formatTime(secondsLeft)}
      </div>
      {/* Start/Pause Button */}
      <div className="flex m-6 justify-center gap-4">
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
      </div>
    </div>
  );
}

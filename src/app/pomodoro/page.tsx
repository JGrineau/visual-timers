"use client";
import { useState, useRef, useEffect } from "react";
import { RotateCcw } from "lucide-react";
import "../../app/globals.css";

const DEFAULT_TIME = 25 * 60; // 25 minutes in seconds

export default function Pomodoro() {
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to set the timer to a specific duration (in seconds)
  function setTimeLeft(duration: number) {
    setSecondsLeft(duration);
  }

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  // Start/stop interval when isRunning changes
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text">
      <div className="text-6xl font-mono mb-8">{formatTime(secondsLeft)}</div>
      <div className="flex gap-4">
        <button
          onClick={isRunning ? handleStop : handleStart}
          className={`px-6 py-2 ${
            isRunning
              ? "border-2 rounded-2xl border-border text-text bg-transparent hover:bg-background-dark hover:text-text-muted hover:cursor-pointer"
              : "border-2 rounded-2xl border-border text-text bg-transparent hover:bg-background-dark hover:text-text-muted hover:cursor-pointer"
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
function setTimeLeft(duration: any) {
  throw new Error("Function not implemented.");
}

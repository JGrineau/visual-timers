"use client";
import { useState, useRef } from "react";

const DEFAULT_TIME = 25 * 60; // 25 minutes in seconds

export default function Pomodoro() {
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Format seconds as MM:SS
  const formatTime = (secs: number) =>
    `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(
      secs % 60
    ).padStart(2, "0")}`;

  // Start timer
  const startTimer = () => {
    if (isRunning) return;
    setIsRunning(true);
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
  };

  // Pause timer
  const pauseTimer = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // Reset timer
  const resetTimer = () => {
    pauseTimer();
    setSecondsLeft(DEFAULT_TIME);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--background)] text-[var(--text-color)]">
      <h1 className="text-3xl font-bold mb-6">Pomodoro Timer</h1>
      <div className="text-6xl font-mono mb-8">{formatTime(secondsLeft)}</div>
      <div className="flex gap-4">
        <button
          onClick={startTimer}
          disabled={isRunning}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Start
        </button>
        <button
          onClick={pauseTimer}
          disabled={!isRunning}
          className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Pause
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Reset
        </button>
      </div>
      <p className="mt-8 text-center text-lg">
        The Pomodoro Technique is a time management method. Work for 25 minutes,
        then take a short break!
      </p>
    </div>
  );
}

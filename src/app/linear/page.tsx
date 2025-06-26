"use client";
import React, { useRef, useEffect, useState } from "react";
import DurationSelector from "@/components/duration-selection/Page";
import SizeSelector from "@/components/size-selection/Page";
import { RotateCcw } from "lucide-react";
import Full from "@/components/full-screen/Page";
import "../../app/globals.css";
import SettingsPanel from "@/components/settings-panel/Page";

export default function Linear() {
  const progressRef = useRef<SVGLineElement>(null);

  const [duration, setDuration] = useState(600);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [size, setSize] = useState(600); // Default, gets updated dynamically

  // Update `size` based on window width
  useEffect(() => {
    const updateSize = () => {
      const width = Math.min(window.innerWidth * 0.9, 600); // 90% of screen width or max 600
      setSize(width);
    };

    updateSize(); // Initial call
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Sync timeLeft when duration changes
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current!);
  }, [isRunning]);

  // Update progress line
  useEffect(() => {
    if (progressRef.current) {
      const progress = (timeLeft / duration) * size;
      progressRef.current.setAttribute("x2", `${progress}`);
    }
  }, [timeLeft, duration, size]);

  // Format time display
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formatTime = (min: number, sec: number) =>
    `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;

  const handleStart = () => {
    if (!isRunning && timeLeft > 0) setIsRunning(true);
  };

  const handleStop = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(duration);
    if (progressRef.current) {
      progressRef.current.setAttribute("x2", "0");
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (isRunning) {
          handleStop();
        } else if (timeLeft > 0) {
          handleStart();
        }
      }
      if (e.key.toLowerCase() === "r") handleReset();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, timeLeft]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {/* Timer Area */}
      <div className="w-full max-w-[90vw] sm:max-w-[600px]">
        <svg
          width="100%"
          height="40"
          viewBox={`0 0 ${size} 40`}
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="20"
            x2={size}
            y2="20"
            stroke="gray"
            strokeWidth="20"
            strokeLinecap="round"
          />
          <line
            ref={progressRef}
            x1="0"
            y1="20"
            x2="0"
            y2="20"
            stroke="var(--accent-color)"
            strokeWidth="20"
            strokeLinecap="round"
          />
        </svg>
        <div className="text-center mt-4 text-2xl sm:text-3xl font-bold">
          {formatTime(minutes, seconds)}
        </div>
      </div>

      {/* Control Buttons */}

      <div className="flex gap-4 mt-8 items-center justify-center w-full max-w-[600px]">
        <button
          onClick={isRunning ? handleStop : handleStart}
          className="px-6 py-2 border-2 border-[var(--accent-color)] rounded-2xl text-black bg-transparent hover:bg-[var(--accent-color)] hover:text-white transition"
          disabled={timeLeft === 0}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={handleReset}
          className="p-2 text-[var(--accent-color)] rounded-full hover:scale-110 transition-transform duration-200"
          title="Reset Timer"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
        <SettingsPanel />
      </div>
    </div>
  );
}

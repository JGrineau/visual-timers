'use client';
import React, { useRef, useEffect, useState } from "react";
import DurationSelector from "@/components/duration-selection/Page";
import SizeSelector from "@/components/size-selection/Page";
import { RotateCcw } from "lucide-react";
import Full from "@/components/full-screen/Page";

import '../../app/globals.css'; 

export default function Linear() {
  const progressRef = useRef<SVGLineElement>(null);

  const [duration, setDuration] = useState(600);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [size, setSize] = useState(700); 

  // Sync timeLeft if duration changes
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  // Start / Stop timer
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
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

  // Update SVG progress
  useEffect(() => {
    if (progressRef.current) {
      const progress = (timeLeft / duration) * size;
      progressRef.current.setAttribute("x2", `${progress}`);
    }
  }, [timeLeft, duration, size]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formatTime = (min: number, sec: number) => {
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (!isRunning && timeLeft > 0) setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(duration);
    if (progressRef.current) {
      progressRef.current.setAttribute("x2", "0");
    }
  };

   useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault(); // Prevent scrolling
      if (isRunning) {
        handleStop();
      } else if (timeLeft > 0) {
        handleStart();
      }
    }

    if (e.key.toLowerCase() === 'r') {
      handleReset();
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [isRunning, timeLeft]);

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 text-black">

<SizeSelector size={size} onChange={setSize} />
        <DurationSelector value={duration} onChange={setDuration} />
        <Full className="bg-white" >
      {/* Linear Progress Timer */}
      <div className="mt-10" style={{ width: size }}>
        <svg width={size} height="40">
          {/* Background Line */}
          <line
            x1="0"
            y1="20"
            x2={size}
            y2="20"
            stroke="gray"
            strokeWidth="20"
            strokeLinecap="round"
          />
          {/* Progress Line */}
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

        {/* Timer Display */}
        <div className="text-center mt-4 text-3xl font-bold">
          {formatTime(minutes, seconds)}
        </div>
      </div>
      </Full>

      {/* Control Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={isRunning ? handleStop : handleStart}
          className={`px-6 py-2 ${
            isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
          } text-white rounded`}
          disabled={timeLeft === 0}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>

        <button
          onClick={handleReset}
          className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full"
          title="Reset Timer"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

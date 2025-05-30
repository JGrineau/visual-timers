'use client';

import { useEffect, useRef, useState } from 'react';
import DurationSelector from '@/components/duration-selection/Page';
import SizeSelector from '@/components/size-selection/Page';


export default function RadialTimer() {

  const [size, setSize] = useState(400); // Default size

   const RADIUS = size / 2 - 20;

  const [duration, setDuration] = useState(600); // default to 10 minutes
  
  const FULL_DASH_ARRAY = 2 * Math.PI * RADIUS;

  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

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

  useEffect(() => {
    if (progressRef.current) {
      const offset = FULL_DASH_ARRAY * (timeLeft / duration);
      progressRef.current.style.strokeDashoffset = offset.toString();
    }
  }, [timeLeft, duration]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleStart = () => {
    if (!isRunning && timeLeft > 0) {
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
    setTimeLeft(duration);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-black gap-6">

      {/* Size Selector */}
      <SizeSelector size={size} onChange={setSize} />

      {/* Duration Selector */}
      <DurationSelector value={duration} onChange={setDuration} />

      {/* Timer Display */}
       <div style={{ width: size, height: size }} className="relative">
        <svg className="w-full h-full rotate-[-90deg]">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={RADIUS}
            fill="none"
            stroke="gray"
            strokeWidth="20"
          />
          <circle
            ref={progressRef}
            cx={size / 2}
            cy={size / 2}
            r={RADIUS}
            fill="none"
            stroke="#00ff88"
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray={FULL_DASH_ARRAY}
            strokeDashoffset={0}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold"
            style={{ fontSize: `${size / 10}px` }}>
              
            {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleStart}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
          disabled={isRunning || timeLeft === 0}
        >
          Start
        </button>
        <button
          onClick={handleStop}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
          disabled={!isRunning}
        >
          Stop
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
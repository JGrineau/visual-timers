"use client";

import { useEffect, useRef, useState } from "react";
import SettingsPanel from "@/components/settings-panel/Page";
import FullScreen from "@/components/full-screen/Page";
import { RotateCcw } from "lucide-react";
import "../../app/globals.css";

export default function RadialTimer() {
  const [size, setSize] = useState(400);

  const RADIUS = size / 2 - 20;

  const [duration, setDuration] = useState(600);

  const FULL_DASH_ARRAY = 2 * Math.PI * RADIUS;

  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<SVGCircleElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  <audio ref={audioRef} src="/Alarm.mp3" preload="auto" />;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 449) {
        setSize(220);
      } else if (window.innerWidth < 769) {
        setSize(280);
      } else {
        setSize(400);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);

            if (audioRef.current) {
              audioRef.current.currentTime = 0;
              audioRef.current.play();
            }

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

      if (e.key.toLowerCase() === "r") {
        handleReset();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, timeLeft]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text">
      {/* Timer Display */}
      {/* SVGCircleElement */}
      <FullScreen className="bg-transparent">
        <div
          style={{
            width: size,
            height: size,
            maxWidth: "90vw",
            maxHeight: "60vw",
          }}
          className="bg-transparent"
        >
          <svg className="w-full h-full rotate-[-90deg] bg-transparent">
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
              stroke="var(--primary)"
              strokeWidth="20"
              strokeLinecap="round"
              strokeDasharray={FULL_DASH_ARRAY}
              strokeDashoffset={0}
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-text"
            style={{ fontSize: `${size / 10}px` }}
          >
            {minutes}:{seconds.toString().padStart(2, "0")}
          </div>
        </div>
      </FullScreen>

      {/* Start Button */}
      <div className="flex gap-4 mt-8 items-center justify-center w-full max-w-[600px]">
        <button
          onClick={isRunning ? handleStop : handleStart}
          className={`px-6 py-2 ${
            isRunning
              ? "border-3 rounded-2xl border-border text-text bg-transparent hover:bg-primary hover:text-white hover:cursor-pointer"
              : "border-3 rounded-2xl border-border text-text bg-transparent hover:bg-primary hover:text-white hover:cursor-pointer"
          } text-black rounded`}
          disabled={timeLeft === 0}
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
          size={size}
          duration={duration}
          onApply={(newSize, newDuration) => {
            setSize(newSize);
            setDuration(newDuration);
            setTimeLeft(newDuration); // reset timer with new duration

            if (progressRef.current) {
              progressRef.current.setAttribute("x2", "0"); // reset progress line
            }
          }}
        />
      </div>
      {/* Audio Element */}
      <audio ref={audioRef} src="/Alarm.mp3" preload="auto" />
    </div>
  );
}

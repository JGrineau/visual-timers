"use client";

import React, { useState } from "react";
import { Settings, X } from "lucide-react";
import SizeSelection from "@/components/size-selection/Page";
import DurationSelector from "@/components/duration-selection/Page";
import Alarm from "@/components/alarm/Page";
import { stopSound } from "../alarm/utils/audioController";
import PomodoroSettings from "../pomodoro-settings/Page";
import "../../app/globals.css";

interface SettingsPanelProps {
  size: number;
  duration: number;
  onApply: (
    size: number,
    duration: number,
    sound: string,
    times: {
      pomodoro: number;
      shortBreak: number;
      longBreak: number;
    }
  ) => void;
  isPomodoroPage?: boolean;
  isRadialPage?: boolean;
}

const Page: React.FC<SettingsPanelProps> = ({
  size,
  duration,
  onApply,
  isPomodoroPage = false,
  isRadialPage = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Local temporary states
  const [tempSize, setTempSize] = useState(size);
  const [tempDuration, setTempDuration] = useState(duration);
  const [tempSound, setTempSound] = useState("/Alarm.mp3");

  // Pomodoro settings states (add default values as needed)
  const [pomodoro, setPomodoro] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(10);

  const togglePanel = () => setIsOpen(!isOpen);
  const closePanel = () => setIsOpen(false);

  // Reset temp states when opening
  React.useEffect(() => {
    if (isOpen) {
      setTempSize(size);
      setTempDuration(duration);
      const saved = localStorage.getItem("selectedSound");
      setTempSound(saved || "/Alarm.mp3");
    }
  }, [isOpen, size, duration]);

  const handleApply = () => {
    stopSound();
    localStorage.setItem("selectedSound", tempSound); // Save to localStorage
    onApply(tempSize, tempDuration, tempSound, {
      pomodoro,
      shortBreak,
      longBreak,
    });
    closePanel();
  };
  return (
    <div>
      {/* Settings Icon Button */}
      <button
        onClick={togglePanel}
        className="p-2 text-text hover:scale-110 hover:cursor-pointer transition duration-300"
        title="Settings"
        aria-label="Open Settings"
      >
        <Settings className="w-6 h-6" />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent backdrop-blur-sm backdrop-brightness-50 flex items-center justify-center z-50"
          onClick={closePanel}
          aria-modal="true"
          role="dialog"
          aria-labelledby="settings-title"
          aria-describedby="settings-desc"
        >
          {/* Modal Content */}
          <div
            className="bg-background-light rounded-2xl p-4 max-w-md w-[90vw] relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="w-full flex justify-end">
              <button
                onClick={closePanel}
                className="p-1 rounded hover:scale-110 hover:cursor-pointer transition"
                aria-label="Close Settings"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <h2
              id="settings-title"
              className="text-lg font-semibold mb-4 text-text"
            >
              Settings
            </h2>
            {/* Show Size Selection and Duration Selector ONLY on radial page */}
            {isRadialPage && (
              <>
                {/* Size Selection */}
                <div className="mb-4 hidden xl:block ">
                  <SizeSelection size={tempSize} onChange={setTempSize} />
                </div>

                {/* Duration Selection */}
                <div className="mb-4">
                  <DurationSelector
                    value={tempDuration}
                    onChange={setTempDuration}
                  />
                </div>
              </>
            )}

            {/* Sound Selection */}

            {/* Alarm Component */}
            <Alarm
              value={tempSound}
              onChange={(sound) => setTempSound(sound)}
            />

            {isPomodoroPage && (
              <PomodoroSettings
                pomodoro={pomodoro}
                shortBreak={shortBreak}
                longBreak={longBreak}
                onChange={({ pomodoro, shortBreak, longBreak }) => {
                  setPomodoro(pomodoro);
                  setShortBreak(shortBreak);
                  setLongBreak(longBreak);
                }}
              />
            )}

            {/* Apply Button */}
            <div className="flex justify-end w-full">
              <button
                onClick={handleApply}
                className="px-6 py-2 border-2 border-border rounded-2xl text-text bg-transparent hover:bg-primary hover:text-white transition cursor-pointer"
              >
                Apply Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Page;

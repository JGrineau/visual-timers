"use client";

import React, { useState, useEffect } from "react";
import { Settings, X } from "lucide-react";
import SizeSelection from "@/components/size-selection/Page";
import DurationSelector from "@/components/duration-selection/Page";
import Alarm from "@/components/alarm/Page";
import { stopSound } from "../alarm/utils/audioController";
import PomodoroSettings from "../pomodoro-settings/Page";
import SpotifyPlayer from "@/components/spotify/Page"; // Make sure this is renamed properly
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
  const [activeTab, setActiveTab] = useState<"settings" | "spotify">(
    "settings"
  );

  // Temporary state
  const [tempSize, setTempSize] = useState(size);
  const [tempDuration, setTempDuration] = useState(duration);
  const [tempSound, setTempSound] = useState("/Alarm.mp3");

  const [pomodoro, setPomodoro] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(10);

  const togglePanel = () => setIsOpen(!isOpen);
  const closePanel = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      setTempSize(size);
      setTempDuration(duration);
      const saved = localStorage.getItem("selectedSound");
      setTempSound(saved || "/Alarm.mp3");
    }
  }, [isOpen, size, duration]);

  const handleApply = () => {
    stopSound();
    localStorage.setItem("selectedSound", tempSound);
    onApply(tempSize, tempDuration, tempSound, {
      pomodoro,
      shortBreak,
      longBreak,
    });
    closePanel();
  };

  return (
    <div>
      <button
        onClick={togglePanel}
        className="p-2 text-text hover:scale-110 hover:cursor-pointer transition duration-300"
        title="Settings"
        aria-label="Open Settings"
      >
        <Settings className="w-6 h-6" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent backdrop-blur-sm backdrop-brightness-50 flex items-center justify-center z-50"
          onClick={closePanel}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="bg-background-light rounded-2xl p-4 max-w-md w-[90vw] relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-text">Panel</h2>
              <button
                onClick={closePanel}
                className="p-1 rounded hover:scale-110 hover:cursor-pointer transition"
                aria-label="Close Settings"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex mb-4">
              <button
                className={`flex-1 py-2 text-sm font-medium rounded-t-lg border-b-3 transition hover:cursor-pointer cursor-pointer ${
                  activeTab === "settings"
                    ? "border-primary text-text"
                    : "border-transparent text-muted hover:text-text"
                }`}
                onClick={() => setActiveTab("settings")}
              >
                Settings
              </button>
              <button
                className={`flex-1 py-2 text-sm font-medium rounded-t-lg border-b-2 transition hover:cursor-pointer cursor-pointer ${
                  activeTab === "spotify"
                    ? "border-primary text-text"
                    : "border-transparent text-muted hover:text-text"
                }`}
                onClick={() => setActiveTab("spotify")}
              >
                Spotify
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex flex-col gap-4">
              {activeTab === "settings" ? (
                <>
                  {isRadialPage && (
                    <>
                      <div className="hidden xl:block">
                        <SizeSelection size={tempSize} onChange={setTempSize} />
                      </div>
                      <DurationSelector
                        value={tempDuration}
                        onChange={setTempDuration}
                      />
                    </>
                  )}

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

                  <div className="flex justify-end w-full">
                    <button
                      onClick={handleApply}
                      className="px-6 py-2 border-2 border-border rounded-2xl text-text bg-transparent hover:bg-primary hover:text-white transition cursor-pointer"
                    >
                      Apply Settings
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <SpotifyPlayer />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

"use client";

import React from "react";
import { playSound } from "./utils/audioController";
import "../../app/globals.css";

interface AlarmProps {
  value: string;
  onChange: (value: string) => void;
}

const Page: React.FC<AlarmProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    playSound(newValue); // Preview the new sound
    onChange(newValue); // Notify parent of selection
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="sound"
        className="block text-sm font-semibold mb-2 cursor-pointer text-text"
      >
        Select Alarm Sound:
      </label>
      <select
        id="sound"
        value={value}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-md bg-background border border-border text-text focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
      >
        <option value="/Alarm.mp3">Classic Alarm</option>
        <option value="/AlarmBuzz.mp3">Buzz</option>
        <option value="/Digital.mp3">Digital</option>
        <option value="/Morning.mp3">Morning Wake up</option>
        <option value="/AlarmNotification.mp3">Soft Wake up</option>
      </select>
    </div>
  );
};
export default Page;

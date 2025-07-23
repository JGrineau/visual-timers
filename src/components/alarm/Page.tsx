"use client";

import React from "react";
import "../../app/globals.css";

interface AlarmProps {
  value: string;
  onChange: (value: string) => void;
}

const Page: React.FC<AlarmProps> = ({ value, onChange }) => {
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
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 rounded-md bg-background border border-border text-text focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
      >
        <option value="/Alarm.mp3">Classic Alarm</option>
        <option value="/AlarmBeep.mp3">Beep</option>
        <option value="/AlarmChime.mp3">Chime</option>
        <option value="/AlarmDigital.mp3">Digital</option>
        <option value="/AlarmBuzz.mp3">Buzz</option>
      </select>
    </div>
  );
};
export default Page;

"use client";

import { useEffect, useState } from "react";

interface DurationSelectorProps {
  value: number; // total time in seconds
  onChange: (value: number) => void;
}

export default function Page({ value, onChange }: DurationSelectorProps) {
  const [minutes, setMinutes] = useState<string>(
    Math.floor(value / 60).toString()
  );
  const [seconds, setSeconds] = useState<string>((value % 60).toString());

  // Sync internal state if `value` prop changes
  // useEffect(() => {
  //   setMinutes(Math.floor(value / 60));
  //   setSeconds(value % 60);
  // }, [value]);

  // Update parent when either minutes or seconds change
  const updateDuration = (m: number, s: number) => {
    const total = m * 60 + s;
    onChange(total);
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (/^\d*$/.test(raw)) {
      setMinutes(raw);
      const parsed = parseInt(raw || "0", 10);
      const sec = parseInt(seconds || "0", 10);
      onChange(parsed * 60 + sec);
    }
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (/^\d*$/.test(raw)) {
      let parsed = parseInt(raw || "0", 10);
      if (parsed > 59) parsed = 59;
      setSeconds(raw);
      const min = parseInt(minutes || "0", 10);
      onChange(min * 60 + parsed);
    }
  };

  return (
    <div className="bg-white bg-opacity-90 text-black p-4 rounded-lg shadow-lg backdrop-blur-sm">
      <label className="block text-sm font-semibold mb-2">Timer Duration</label>
      <div className="flex gap-4 items-center">
        <div className="flex flex-col">
          <label htmlFor="minutes" className="text-xs mb-1">
            Minutes
          </label>
          <input
            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="minutes"
            type="number"
            min={0}
            value={minutes}
            placeholder="0"
            onChange={handleMinutesChange}
            onFocus={() => minutes === "0" && setMinutes("")}
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="seconds" className="text-xs mb-1">
            Seconds
          </label>
          <input
            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="seconds"
            type="number"
            min={0}
            max={59}
            value={seconds}
            placeholder="0"
            onChange={handleSecondsChange}
            onFocus={() => seconds === "0" && setSeconds("")}
          />
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";

type PomodoroSettingsProps = {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  onChange: (values: {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
  }) => void;
};

export default function PomodoroSettings({
  pomodoro,
  shortBreak,
  longBreak,
  onChange,
}: PomodoroSettingsProps) {
  const [pomodoroStr, setPomodoroStr] = useState(pomodoro.toString());
  const [shortStr, setShortStr] = useState(shortBreak.toString());
  const [longStr, setLongStr] = useState(longBreak.toString());

  // Keep in sync with external changes
  useEffect(() => {
    setPomodoroStr(pomodoro.toString());
    setShortStr(shortBreak.toString());
    setLongStr(longBreak.toString());
  }, [pomodoro, shortBreak, longBreak]);

  const handleBlur = () => {
    const p = parseInt(pomodoroStr || "0", 10);
    const s = parseInt(shortStr || "0", 10);
    const l = parseInt(longStr || "0", 10);
    onChange({ pomodoro: p, shortBreak: s, longBreak: l });
  };

  const inputClass =
    "w-full px-4 py-2 rounded-md bg-background border border-border text-text focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div className="mb-4 space-y-3">
      <label className="block text-sm font-semibold text-text mb-1">
        Pomodoro Length (minutes)
      </label>
      <input
        type="number"
        min={0}
        max={120}
        value={pomodoroStr}
        placeholder="0"
        onChange={(e) => {
          const raw = e.target.value;
          if (/^\d*$/.test(raw)) setPomodoroStr(raw);
        }}
        onFocus={() => pomodoroStr === "0" && setPomodoroStr("")}
        onBlur={handleBlur}
        className={inputClass}
      />

      <label className="block text-sm font-semibold text-text mb-1">
        Short Break (minutes)
      </label>
      <input
        type="number"
        min={0}
        max={60}
        value={shortStr}
        placeholder="0"
        onChange={(e) => {
          const raw = e.target.value;
          if (/^\d*$/.test(raw)) setShortStr(raw);
        }}
        onFocus={() => shortStr === "0" && setShortStr("")}
        onBlur={handleBlur}
        className={inputClass}
      />

      <label className="block text-sm font-semibold text-text mb-1">
        Long Break (minutes)
      </label>
      <input
        type="number"
        min={0}
        max={60}
        value={longStr}
        placeholder="0"
        onChange={(e) => {
          const raw = e.target.value;
          if (/^\d*$/.test(raw)) setLongStr(raw);
        }}
        onFocus={() => longStr === "0" && setLongStr("")}
        onBlur={handleBlur}
        className={inputClass}
      />
    </div>
  );
}

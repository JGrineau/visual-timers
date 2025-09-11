import React, { useState, useEffect } from "react";

type NorwegianSettingsProps = {
  hard: number; // minutes
  relax: number; // minutes
  rounds: number; // total rounds
  onChange: (values: { hard: number; relax: number; rounds: number }) => void;
};

export default function NorwegianSettings({
  hard,
  relax,
  rounds,
  onChange,
}: NorwegianSettingsProps) {
  const [hardStr, setHardStr] = useState(hard.toString());
  const [relaxStr, setRelaxStr] = useState(relax.toString());
  const [roundsStr, setRoundsStr] = useState(rounds.toString());

  // Keep in sync with external changes
  useEffect(() => {
    setHardStr(hard.toString());
    setRelaxStr(relax.toString());
    setRoundsStr(rounds.toString());
  }, [hard, relax, rounds]);

  const handleBlur = () => {
    const h = parseInt(hardStr || "0", 10);
    const r = parseInt(relaxStr || "0", 10);
    const n = parseInt(roundsStr || "0", 10);
    onChange({ hard: h, relax: r, rounds: n });
  };

  const inputClass =
    "w-full px-4 py-2 rounded-md bg-background border border-border text-text focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div className="mb-4 space-y-3">
      {/* Hard */}
      <label className="block text-sm font-semibold text-text mb-1">
        Hard Length (minutes)
      </label>
      <input
        type="number"
        min={1}
        max={120}
        value={hardStr}
        placeholder="0"
        onChange={(e) => {
          const raw = e.target.value;
          if (/^\d*$/.test(raw)) setHardStr(raw);
        }}
        onFocus={() => hardStr === "0" && setHardStr("")}
        onBlur={handleBlur}
        className={inputClass}
      />

      {/* Relax */}
      <label className="block text-sm font-semibold text-text mb-1">
        Relax Length (minutes)
      </label>
      <input
        type="number"
        min={1}
        max={120}
        value={relaxStr}
        placeholder="0"
        onChange={(e) => {
          const raw = e.target.value;
          if (/^\d*$/.test(raw)) setRelaxStr(raw);
        }}
        onFocus={() => relaxStr === "0" && setRelaxStr("")}
        onBlur={handleBlur}
        className={inputClass}
      />

      {/* Rounds */}
      <label className="block text-sm font-semibold text-text mb-1">
        Total Rounds
      </label>
      <input
        type="number"
        min={1}
        max={20}
        value={roundsStr}
        placeholder="0"
        onChange={(e) => {
          const raw = e.target.value;
          if (/^\d*$/.test(raw)) setRoundsStr(raw);
        }}
        onFocus={() => roundsStr === "0" && setRoundsStr("")}
        onBlur={handleBlur}
        className={inputClass}
      />
    </div>
  );
}

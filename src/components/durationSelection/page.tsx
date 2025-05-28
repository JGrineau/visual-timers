'use client';

interface DurationSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export default function DurationSelector({ value, onChange }: DurationSelectorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseInt(e.target.value);
    onChange(newValue);
  };

  return (
    <div className="mb-4">
      <label htmlFor="duration" className="mr-2">Timer Duration:</label>
      <select
        id="duration"
        value={value}
        onChange={handleChange}
        className="text-black px-3 py-1 rounded"
      >
        <option value={60}>1 Minute</option>
        <option value={300}>5 Minutes</option>
        <option value={600}>10 Minutes</option>
        <option value={900}>15 Minutes</option>
      </select>
    </div>
  );
}

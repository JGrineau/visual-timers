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
    <div className="bg-white bg-opacity-90 text-black p-4 rounded-lg shadow-lg backdrop-blur-sm">
      <label htmlFor="duration" className="block text-sm font-semibold mb-2">
        Timer Duration
      </label>
      <select
        id="duration"
        value={value}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value={60}>1 Minute</option>
        <option value={300}>5 Minutes</option>
        <option value={600}>10 Minutes</option>
        <option value={900}>15 Minutes</option>
      </select>
    </div>
  );
}

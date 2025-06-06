// components/SizeSelector.tsx
type SizeSelectorProps = {
  size: number;
  onChange: (newSize: number) => void;
};

export default function Page({ size, onChange }: SizeSelectorProps) {
  return (
     <div className="absolute top-140 right-90 bg-white bg-opacity-90 text-black p-5 rounded-lg shadow-lg backdrop-blur-sm">
      <label className="block text-sm font-semibold mb-2">Timer Size</label>
      <select
        value={size}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value={400}>Small</option>
        <option value={500}>Medium</option>
        <option value={600}>Large</option>
        <option value={700}>XL</option>
      </select>
    </div>
  );
}

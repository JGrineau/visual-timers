// components/SizeSelector.tsx
type SizeSelectorProps = {
  size: number;
  onChange: (newSize: number) => void;
};

export default function Page({ size, onChange }: SizeSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-lg font-medium">Size:</label>
      <select
        value={size}
        onChange={(e) => onChange(Number(e.target.value))}
        className="px-3 py-1 border rounded"
      >
        <option value={400}>Small</option>
        <option value={500}>Medium</option>
        <option value={600}>Large</option>
        <option value={700}>XL</option>
      </select>
    </div>
  );
}

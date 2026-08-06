"use client";

interface AreaInputProps {
  label: string;
  value: string;
  unit: string;
  onValueChange: (value: string) => void;
  onUnitChange: (unit: string) => void;
  placeholder?: string;
}

export default function AreaInput({
  label,
  value,
  unit,
  onValueChange,
  onUnitChange,
  placeholder = "Enter Area",
}: AreaInputProps) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">
        {label}
      </label>

      <div className="flex">
        <input
          type="number"
          min="0"
          step="0.01"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-l-xl border border-r-0 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={unit}
          onChange={(e) => onUnitChange(e.target.value)}
          className="rounded-r-xl border bg-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Sq.Ft.">Sq.Ft.</option>
          <option value="Sq.Yd.">Sq.Yd.</option>
          <option value="Sq.Mtr.">Sq.Mtr.</option>
          <option value="Acre">Acre</option>
          <option value="Hectare">Hectare</option>
        </select>
      </div>
    </div>
  );
}
import { useState } from "react";
import { InputNumber } from "antd";

interface OriginalAntDesignInputProps {
  value: number | string;
  onChange: (value: number | string) => void;
}

export default function OriginalAntDesignInput({ value, onChange }: OriginalAntDesignInputProps) {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (newValue: number | null) => {
    if (newValue === null) {
      onChange("");
      setError(null);
      return;
    }

    if (isNaN(newValue)) {
      setError("Please enter a valid number");
      return;
    }

    setError(null);
    onChange(newValue);
  };

  // Custom styles to match the design reference
  const inputNumberStyle = {
    width: "100%",
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Enter a number:
      </label>
      <InputNumber
        min={0}
        step={1}
        value={value === "" ? null : value}
        onChange={handleChange}
        style={inputNumberStyle}
      />
      {error && (
        <div className="mt-1 text-sm text-red-600">{error}</div>
      )}
    </div>
  );
}
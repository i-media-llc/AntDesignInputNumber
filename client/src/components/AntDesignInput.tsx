import { useState, useRef } from "react";
import { InputNumber } from "antd";
import { Alert } from "@/components/ui/alert";

interface AntDesignInputProps {
  value: number | string;
  onChange: (value: number | string) => void;
}

export default function AntDesignInput({ value, onChange }: AntDesignInputProps) {
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<any>(null);
  const [isComposing, setIsComposing] = useState(false);

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

  // 日本語入力の処理を改善
  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  // Enterキーの処理を制御
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isComposing) {
      // 日本語入力中のEnterは処理しない
      e.stopPropagation();
      return;
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        数値を入力:
      </label>
      <InputNumber
        min={0}
        step={1}
        value={value === "" ? undefined : typeof value === "string" ? parseFloat(value) || undefined : value}
        onChange={handleChange}
        style={inputNumberStyle}
        ref={inputRef}
        // 日本語入力イベントの処理を追加
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onKeyDown={handleKeyDown}
      />
      {error && (
        <div className="mt-1 text-sm text-red-600">{error}</div>
      )}
    </div>
  );
}

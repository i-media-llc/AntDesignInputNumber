import { useState } from "react";
import { InputNumber } from "antd";

interface OriginalAntDesignInputProps {
  value: number | string;
  onChange: (value: number | string) => void;
}

export default function OriginalAntDesignInput({
  value,
  onChange,
}: OriginalAntDesignInputProps) {
  const [error, setError] = useState<string | null>(null);

  // 型変換を行うハンドラー
  const handleChange = (newValue: number | null) => {
    if (newValue === null) {
      onChange("");
      setError(null);
      return;
    }

    if (isNaN(newValue)) {
      setError("有効な数値を入力してください");
      return;
    }

    setError(null);
    onChange(newValue);
  };

  // InputNumberコンポーネントのためのスタイル
  const inputNumberStyle = {
    width: "100%",
  };

  // 表示用の値を計算
  const displayValue =
    value === ""
      ? undefined
      : typeof value === "string"
        ? parseFloat(value) || undefined
        : value;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        数値を入力:
      </label>
      <InputNumber
        min={0}
        step={1}
        value={displayValue}
        onChange={handleChange}
        style={inputNumberStyle}
      />
      {error && <div className="mt-1 text-sm text-red-600">{error}</div>}
      <div className="mt-1 text-sm text-orange-500">
        ※このコンポーネントには日本語入力バグがあります
      </div>
    </div>
  );
}

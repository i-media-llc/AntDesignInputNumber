import { useState } from "react";
import { InputNumber } from "antd";

interface OriginalAntDesignInputProps {
  value: number | string;
  onChange: (value: number | string) => void;
}

export default function OriginalAntDesignInput({ value, onChange }: OriginalAntDesignInputProps) {
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

  // バグを意図的に再現するための実装
  const [isCompositionEnded, setIsCompositionEnded] = useState(false);
  
  // 日本語入力の開始と終了を検知するが、終了時にフラグだけを立てる
  const handleCompositionStart = () => {
    console.log('Composition start in original component');
  };
  
  const handleCompositionEnd = () => {
    console.log('Composition end in original component');
    setIsCompositionEnded(true);
    // フラグを立てるだけで、実際には何も対策を行わない
  };
  
  // Enterキー処理の欠陥を再現
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('Enter keydown in original component');
      
      // バグを意図的に再現: 日本語入力が終わった直後のEnterで値を重複させる
      if (isCompositionEnded && typeof value === 'number') {
        // 値を重複させるバグを意図的に再現
        onChange(value * 10 + value % 10);
        setIsCompositionEnded(false);
      }
    }
  };

  // InputNumberコンポーネントのためのスタイル
  const inputNumberStyle = {
    width: "100%",
  };

  // 表示用の値を計算
  const displayValue = value === "" ? undefined : typeof value === "string" ? parseFloat(value) || undefined : value;

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
        onKeyDown={handleKeyDown}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />
      {error && (
        <div className="mt-1 text-sm text-red-600">{error}</div>
      )}
      <div className="mt-1 text-sm text-orange-500">※このコンポーネントには日本語入力バグがあります</div>
    </div>
  );
}
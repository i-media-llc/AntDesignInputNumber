import { useState, ChangeEvent } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface HtmlNumberInputProps {
  value: number | string;
  onChange: (value: number | string) => void;
}

export default function HtmlNumberInput({ value, onChange }: HtmlNumberInputProps) {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    if (inputValue === "") {
      onChange("");
      setError(null);
      return;
    }
    
    const numberValue = parseFloat(inputValue);
    
    if (isNaN(numberValue)) {
      setError("Please enter a valid number");
      return;
    }
    
    setError(null);
    onChange(numberValue);
  };

  const handleIncrement = () => {
    const currentValue = value === "" ? 0 : parseFloat(value as string);
    if (!isNaN(currentValue)) {
      onChange(currentValue + 1);
      setError(null);
    }
  };

  const handleDecrement = () => {
    const currentValue = value === "" ? 0 : parseFloat(value as string);
    if (!isNaN(currentValue) && currentValue > 0) {
      onChange(currentValue - 1);
      setError(null);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Enter a number:
      </label>
      <div className="relative">
        <input
          type="number"
          min="0"
          step="1"
          value={value}
          onChange={handleChange}
          className="w-full h-8 px-3 pr-7 text-gray-800 border border-gray-300 rounded-md 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   hover:border-blue-400 transition-colors"
        />
        <div className="absolute right-0 top-0 h-full flex flex-col border-l border-gray-300">
          <button
            type="button"
            onClick={handleIncrement}
            className="flex items-center justify-center h-1/2 w-6 
                     bg-gray-50 hover:bg-blue-50 transition-colors
                     border-b border-gray-300 rounded-tr-md"
          >
            <ChevronUp className="h-3 w-3" />
          </button>
          <button
            type="button"
            onClick={handleDecrement}
            className="flex items-center justify-center h-1/2 w-6 
                     bg-gray-50 hover:bg-blue-50 transition-colors
                     rounded-br-md"
          >
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </div>
      {error && (
        <div className="mt-1 text-sm text-red-600">{error}</div>
      )}
    </div>
  );
}

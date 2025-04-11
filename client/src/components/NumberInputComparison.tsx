import { useState } from "react";
import AntDesignInput from "./AntDesignInput";
import OriginalAntDesignInput from "./OriginalAntDesignInput";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function NumberInputComparison() {
  const [originalAntValue, setOriginalAntValue] = useState<number | string>(0);
  const [improvedAntValue, setImprovedAntValue] = useState<number | string>(0);

  const handleOriginalAntValueChange = (value: number | string) => {
    setOriginalAntValue(value);
  };

  const handleImprovedAntValueChange = (value: number | string) => {
    setImprovedAntValue(value);
  };

  return (
    <Card className="bg-white rounded-lg shadow-md">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-medium mb-4 text-gray-800">
              改良前のAnt Design InputNumber
            </h2>
            <OriginalAntDesignInput value={originalAntValue} onChange={handleOriginalAntValueChange} />
            
            <div className="pt-4 text-sm text-gray-700">
              <p><span className="font-medium">特徴:</span></p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>標準的な実装</li>
                <li>日本語入力時の問題あり</li>
                <li>全角数字入力後のEnterキーで二重入力バグあり</li>
                <li>入力確定処理が不完全</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-4 text-gray-800">
              改良後のAnt Design InputNumber
            </h2>
            <AntDesignInput value={improvedAntValue} onChange={handleImprovedAntValueChange} />
            
            <div className="pt-4 text-sm text-gray-700">
              <p><span className="font-medium">改良点:</span></p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>CompositionStart/Endイベント処理を追加</li>
                <li>isComposing状態フラグで入力状態を追跡</li>
                <li>日本語入力中のEnterキー処理を改善</li>
                <li>二重入力バグを修正</li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="mt-2">
          <h2 className="text-lg font-medium mb-4 text-gray-800">結果比較</h2>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-700">改良前の値:</p>
                <p className="mt-1 text-xl font-semibold text-blue-500">
                  {originalAntValue === "" ? "Empty" : originalAntValue}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">改良後の値:</p>
                <p className="mt-1 text-xl font-semibold text-blue-500">
                  {improvedAntValue === "" ? "Empty" : improvedAntValue}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

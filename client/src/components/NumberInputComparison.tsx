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

        <div className="mt-2 mb-6">
          <h2 className="text-lg font-medium mb-4 text-gray-800">不具合再現手順</h2>
          <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
            <ol className="list-decimal pl-5 space-y-2">
              <li className="text-sm text-gray-700">全角の「<span className="font-mono bg-gray-100 px-1 rounded">１００</span>」を入力する</li>
              <li className="text-sm text-gray-700">変換候補から「<span className="font-mono bg-gray-100 px-1 rounded">100</span>」を選んでEnterを押す</li>
              <li className="text-sm text-gray-700">もう一度Enterを押すと改良前の入力が「<span className="font-mono bg-gray-100 px-1 rounded">100100</span>」になる</li>
            </ol>
            <p className="mt-3 text-sm text-gray-600 italic">※改良後のコンポーネントでは同じ操作をしても正しく処理されます</p>
          </div>
        </div>

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
        
        <Separator className="my-8" />
        
        <div className="mt-2">
          <h2 className="text-lg font-medium mb-4 text-gray-800">バグの原因と修正方法</h2>
          <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
            <h3 className="text-md font-medium text-gray-800 mb-2">原因</h3>
            <p className="text-sm text-gray-700 mb-4">
              Ant DesignのInputNumberコンポーネントでは、日本語入力（IME）の確定時に発生するCompositionEndイベントの後、
              確定するためのEnterキーが押されたときに、誤って入力が重複してしまう問題がありました。
              具体的には、IMEの状態（入力中か確定済みか）を追跡する仕組みがなかったため、
              Enterキーの押下が通常の入力として二重に処理されていました。
            </p>
            
            <h3 className="text-md font-medium text-gray-800 mb-2">修正方法</h3>
            <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700">
              <li><code>isComposing</code>フラグを導入して、日本語入力の状態を追跡</li>
              <li><code>onCompositionStart</code>イベントで入力開始を検知して<code>isComposing=true</code>に設定</li>
              <li><code>onCompositionEnd</code>イベントで入力終了を検知して<code>isComposing=false</code>に設定</li>
              <li><code>onKeyDown</code>ハンドラ内で、Enterキーが日本語入力中（<code>isComposing=true</code>）の場合、イベントを処理しないようにする</li>
            </ol>
            
            <p className="mt-3 text-sm text-gray-600 italic">
              これにより、日本語入力確定のためのEnterキーのイベントが、誤って2回処理されることを防止できます。
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

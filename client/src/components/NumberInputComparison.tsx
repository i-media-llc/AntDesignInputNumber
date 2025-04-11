import { useState } from "react";
import AntDesignInput from "./AntDesignInput";
import HtmlNumberInput from "./HtmlNumberInput";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function NumberInputComparison() {
  const [antValue, setAntValue] = useState<number | string>(0);
  const [htmlValue, setHtmlValue] = useState<number | string>(0);

  const handleAntValueChange = (value: number | string) => {
    setAntValue(value);
  };

  const handleHtmlValueChange = (value: number | string) => {
    setHtmlValue(value);
  };

  return (
    <Card className="bg-white rounded-lg shadow-md">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-medium mb-4 text-gray-800">
              Ant Design InputNumber
            </h2>
            <AntDesignInput value={antValue} onChange={handleAntValueChange} />
            
            <div className="pt-4 text-sm text-gray-700">
              <p><span className="font-medium">Features:</span></p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Custom increment/decrement buttons</li>
                <li>Focus and hover states</li>
                <li>Built-in validation</li>
                <li>Configurable step values</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-4 text-gray-800">
              HTML input[type="number"]
            </h2>
            <HtmlNumberInput value={htmlValue} onChange={handleHtmlValueChange} />
            
            <div className="pt-4 text-sm text-gray-700">
              <p><span className="font-medium">Features:</span></p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Native browser validation</li>
                <li>Custom-styled to match Ant Design</li>
                <li>Custom increment/decrement buttons</li>
                <li>Consistent with Ant Design component</li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="mt-2">
          <h2 className="text-lg font-medium mb-4 text-gray-800">Results</h2>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-700">Ant Design InputNumber Value:</p>
                <p className="mt-1 text-xl font-semibold text-blue-500">
                  {antValue === "" ? "Empty" : antValue}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">HTML Input Value:</p>
                <p className="mt-1 text-xl font-semibold text-blue-500">
                  {htmlValue === "" ? "Empty" : htmlValue}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

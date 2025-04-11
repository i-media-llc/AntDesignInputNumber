import NumberInputComparison from "@/components/NumberInputComparison";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Ant Design InputNumber 改良比較
          </h1>
          <p className="text-gray-600">
            日本語入力対応の改良前後のAnt Design InputNumberコンポーネントの比較
          </p>
        </header>

        <NumberInputComparison />
      </div>
    </div>
  );
}

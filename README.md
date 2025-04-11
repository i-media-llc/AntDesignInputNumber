## 概要
Ant Design InputNumberの日本語入力不具合の修正です。

## 不具合内容
1. 全角の「１００」を入力する
1. 変換候補から「100」を選んでEnterを押す
1. もう一度Enterを押すと改良前の入力が「100100」になる

## 原因
Ant DesignのInputNumberコンポーネントでは、日本語入力（IME）の確定時に発生するCompositionEndイベントの後、 確定するためのEnterキーが押されたときに、誤って入力が重複してしまう問題がありました。 具体的には、IMEの状態（入力中か確定済みか）を追跡する仕組みがなかったため、 Enterキーの押下が通常の入力として二重に処理されていました。

## 修正方法
* isComposingフラグを導入して、日本語入力の状態を追跡
* onCompositionStartイベントで入力開始を検知してisComposing=trueに設定
* onCompositionEndイベントで入力終了を検知してisComposing=falseに設定
* onKeyDownハンドラ内で、Enterキーが日本語入力中（isComposing=true）の場合、イベントを処理しないようにする
これにより、日本語入力確定のためのEnterキーのイベントが、誤って2回処理されることを防止できます。

## 修正コード
```
// 状態管理の追加
const [isComposing, setIsComposing] = useState(false);

// 日本語入力の開始を検知
const handleCompositionStart = () => {
  setIsComposing(true);
};

// 日本語入力の終了を検知
const handleCompositionEnd = () => {
  setIsComposing(false);
};

// Enterキー処理の制御
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter' && isComposing) {
    // 日本語入力中のEnterは処理しない
    e.stopPropagation();
    return;
  }
};

// コンポーネントにイベントハンドラを追加
<InputNumber
  value={...}
  onChange={...}
  onCompositionStart={handleCompositionStart}
  onCompositionEnd={handleCompositionEnd}
  onKeyDown={handleKeyDown}
/>
```
https://github.com/i-media-llc/AntDesignInputNumber/blob/main/client/src/components/AntDesignInput.tsx

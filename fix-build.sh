#!/bin/bash

# このスクリプトはビルド後にファイルを整理し、Replitデプロイの要件に合わせます
echo "ビルド出力を修正しています..."

# distディレクトリに必要な構造を作成
mkdir -p dist/public

# dist/public からファイルをdistに移動
if [ -d "dist/public" ]; then
  cp -r dist/public/* dist/
  
  # assetsディレクトリをdist/publicに戻す（必要な場合）
  if [ -d "dist/assets" ]; then
    mkdir -p dist/public/assets
    cp -r dist/assets/* dist/public/assets/
  fi
  
  # index.htmlをdist/publicにコピー
  if [ -f "dist/index.html" ]; then
    cp dist/index.html dist/public/
  fi
fi

echo "ビルド修正が完了しました。"
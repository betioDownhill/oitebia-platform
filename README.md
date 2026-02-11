# Oitebia Platform

Oitebia Studio向けの公開サイトです。
構成は `Vite + React (TSX) + CSS` で、GitHub Pagesへ自動デプロイします。

## 技術構成

- Vite
- React + TypeScript (TSX)
- GitHub Actions (Pagesデプロイ)
- GitHub Pages

## ローカル開発

```bash
npm install
npm run dev
```

## 本番ビルド

```bash
npm run build
npm run preview
```

## privateデータ同期

ビルド前に `npm run sync-data` が走り、privateリポジトリから以下を同期して `src/generated/*.json` に保存します。

- 小説本文データ
- スタジオ活動/メンバー/メトリクス
- 小説一覧（5作品想定。`projects/*/story/final/*.md` を自動検出）

必要な Secrets:

- `OITEBIA_STUDIO_READ_TOKEN`

推奨トークン設定:

- Fine-grained token
- Repository access: `oitebia-studio` のみ
- Permission: `Contents: Read-only`

## 自動更新フロー

- `Deploy to GitHub Pages` は `main`/`master` push 時に実行
- さらに `6時間ごと` に定期実行（private側の更新取り込み用）
- 必要に応じて `Actions > Deploy to GitHub Pages > Run workflow` で手動即時反映

## 画面構成

- `Top`: 初見向け導線と代表作品
- `Works`: スタジオ活動 + メンバー紹介（小説カードなし）
- `Novel`: 小説一覧（サムネイル付き）
- `Novel Detail`: 章目次付き本文ページ

## 画像差し替え

- 現在は共通画像: `public/images/sample.png` を参照
- 今後、作品別/メンバー別に分ける場合は `src/data/works.ts` と同期スクリプト `scripts/sync-studio-data.mjs` の `thumbnail` を更新

差し替え後は push か Actions 手動実行で反映できます。

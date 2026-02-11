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

必要な Secrets:

- `OITEBIA_STUDIO_READ_TOKEN`

推奨トークン設定:

- Fine-grained token
- Repository access: `oitebia-studio` のみ
- Permission: `Contents: Read-only`

## 画面構成

- `Top`: 初見向け導線と代表作品
- `Works`: 作品一覧 + スタジオ活動 + メンバー紹介
- `Novel`: 小説一覧（サムネイル付き）
- `Novel Detail`: 章目次付き本文ページ

## 画像差し替え

- 小説サムネイル: `public/images/novels/*.svg`
- メンバー画像: `public/images/members/*.svg`

同名で実画像に置き換えるだけで反映できます。

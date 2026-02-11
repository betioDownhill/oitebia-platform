# Oitebia Platform (GitHub Pages)

Oitebia Studio向けの公開サイトです。Astroで構築し、GitHub Pagesへ自動デプロイします。

## 目的

- 初見ユーザーに作品世界を短時間で伝える
- 作品詳細と小説導線を同一サイト内に置く
- 作品追加時にデータ追記だけでページを増やせるようにする

## 技術構成

- Astro (Static Site)
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

## GitHub Pages 公開手順

1. リポジトリへpush
2. GitHubの `Settings > Pages` を開く
3. `Build and deployment` の `Source` を `GitHub Actions` に設定
4. `Settings > Secrets and variables > Actions` に `OITEBIA_STUDIO_READ_TOKEN` を追加
5. `Deploy to GitHub Pages` ワークフロー成功後に公開URLへ反映

`OITEBIA_STUDIO_READ_TOKEN` は `oitebia-studio` (private) を読めるPATを設定してください。
推奨は Fine-grained token で、repository access を `oitebia-studio` のみ、permission は `Contents: Read-only`。

## コンテンツ追加

- 作品データ: `src/data/works.ts`
- 小説参照元: `src/data/novelSources.ts`

`works.ts` に作品を追加すると、以下が自動生成されます。

- 作品一覧カード
- 作品詳細ページ (`/works/<slug>`)

`novelSources.ts` に追加すると、小説ページ (`/novels/<slug>`) が生成されます。
本文は `oitebia-studio` を GitHub API でビルド時取得します（private対応）。

# 石川県パラスポーツ協会サイト — プロジェクト概要

## 1. 基本ロジック

### 技術スタック

- **Next.js 16 / React 19** の **静的エクスポート** サイト（`next.config.ts` で `output: "export"`）。SSR は無く、全ページがビルド時に `out/` へ書き出される。
- `trailingSlash: true`、`images.unoptimized: true`。
- パスエイリアス `@/*` → `src/*`。
- Tailwind CSS v4（`@tailwindcss/postcss`）。
- テストなし。`pnpm dev` / `pnpm build` / `pnpm lint`。

### コンテンツの仕組み

記事はすべて `content/` 配下の Markdown（gray-matter フロントマター `title` / `date`）。

```
content/
  articles/<category>/<year>/<month>/<date>.md   # 現行記事
  archives/<category>/<year>/<month>/<date>.md   # 過去記事（2015〜）
```

**カテゴリ**（`src/component/common/article/categoryMetadata.ts` と各 `generateStaticParams` の許可リスト）:
`information, special, newsletters, clubs, ishikawa, national, results, reports, staff, seminars, recruitment, activity`

### URL とレンダリング

| コンテンツ | ルート | ページファイル |
|---|---|---|
| 現行記事 | `/articles/<cat>/<year>/<month>/<date>` | `src/app/articles/[category]/[year]/[month]/[number]/page.tsx` |
| 過去記事（個別） | `/archives/articles/<cat>/<year>/<month>/<date>` | `src/app/archives/articles/[category]/[year]/[month]/[number]/page.tsx` |
| 過去記事一覧 | `/archives/articles` | `src/app/archives/articles/page.tsx`（カテゴリ→年でアコーディオン表示） |

- 両記事ルートは共通コンポーネント **`ArticleDetailPage`** を使い、`contentRoot`（`"articles"` / `"archives"`）だけ切り替える。
- `generateArticleStaticParams(category, contentRoot)` が `content/<root>/<cat>/*/*/*.md` を `fast-glob` で列挙して静的パスを生成。
- 本文描画は **`article.tsx`**：`react-markdown` + `remark-gfm` + `rehype-raw` + `rehype-sanitize`（許可タグ・属性を拡張したスキーマ）。内部リンクは `next/link`、PDF・画像・ダウンロード系（doc/xls/zip 等）は `<a>` に振り分け。

### ビルド時スクリプト（`scripts/`）

- **`copy-content-resources.mjs`**（`predev` / `prebuild`）: `content/` 内の非 `.md` ファイル（PDF・XLS 等）を `public/` へコピー。その際 `archives/` → `archives/articles/` にリマップして URL 構造と一致させる。
- **`generate-sitemap.mjs`**（`prebuild`）: `src/app` の静的ルート + `content/articles/**` から `public/sitemap.xml` を生成。**`content/archives/**` と `/archives/articles` 一覧は除外**（過去記事は検索対象外）。`SITE_URL` 環境変数で本番ドメインを差し替え。
- **`generate-robots.mjs`**（`prebuild`）: `public/robots.txt` を生成。

### 一覧の出し方

記事一覧は **ハードコード**。`ArticleHeader`（`baseDir` + `filePath` を渡すと該当 Markdown からタイトル・日付を読んでリンク行を描画）を各ページに並べる。

- ホームページ「新着情報」: `src/component/top/information/information.tsx`
- ホームページ「特集」: `src/component/top/special/special.tsx`
- カテゴリ系固定ページ: `src/app/tournaments/ishikawa`, `.../national`, `src/app/instructor/{activity,recruitment,seminars}`, `src/app/staff`, `src/app/about/newsletters` など

過去記事一覧（`/archives/articles`）だけは例外で、`content/archives/**/*.md` を glob して自動生成する。

---

## 2. 記事の追加方法

1. `content/articles/<category>/<year>/<month>/<date>.md` を作成。フロントマターに `title` と `date` を記載。

   ```markdown
   ---
   title: 記事タイトル
   date: 2026-09-07
   ---
   本文（Markdown）
   ```

2. 付随ファイル（PDF・XLSX 等）は同じディレクトリに置く。ビルド時に `public/` へコピーされ、`/articles/<category>/<year>/<month>/<filename>` で配信される。本文からは相対 or `/articles/...` 絶対パスでリンク。
3. 一覧に出したい場合は該当ページに `<ArticleHeader>` 行を手動追加：
   - トップの「新着情報」なら `src/component/top/information/information.tsx`
   - カテゴリ固定ページなら対応する `src/app/.../page.tsx`
   - 記入例: `<ArticleHeader baseDir="articles/information" filePath="/2026/09/2026-09-07.md" />`（新しい順に上へ）
4. 記事詳細ページ自体は `generateStaticParams` が Markdown を自動列挙するので、ルート登録の作業は不要。

---

## 3. 記事のアーカイブへの移動方法

1. ファイルを移動：
   `content/articles/<category>/<year>/<month>/<date>.md`
   → `content/archives/<category>/<year>/<month>/<date>.md`
   （同ディレクトリの添付 PDF 等も一緒に移動）
2. 一覧から `<ArticleHeader>` 行を削除（`information.tsx` などハードコード箇所）。
3. それだけで完了：
   - 過去記事詳細ページは `generateArticleStaticParams(category, "archives")` が自動生成し、URL は `/archives/articles/<category>/<year>/<month>/<date>` になる。
   - 過去記事一覧 `/archives/articles` は `content/archives/**/*.md` を glob するので自動的にカテゴリ→年で表示される（手動リスト不要）。
   - サイトマップからは自動的に外れる（`generate-sitemap.mjs` が `content/archives/**` を対象外にしているため）。
4. 添付ファイルの配信先は `copy-content-resources.mjs` が `archives/` → `archives/articles/` にリマップするので、本文リンクは `/archives/articles/<category>/<year>/<month>/<filename>` を指すよう修正する。

> 補足: 過去記事一覧では `information` カテゴリだけ見出しが「過去記事 / ARCHIVES」に置き換えて表示される（`archives/articles/page.tsx` と `[number]/page.tsx` の分岐）。

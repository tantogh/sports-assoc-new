# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
pnpm dev        # start dev server (runs copy-content-resources.mjs first)
pnpm build      # static export to out/ (runs copy-content-resources.mjs first)
pnpm lint       # ESLint
```

No test suite exists.

## Architecture

This is a **static-export** Next.js 16 / React 19 site for the Ishikawa Parasports Association. `next.config.ts` sets `output: "export"`, so there is no SSR — all pages are pre-rendered at build time.

### Path alias

`@/*` → `src/*`

### Content system

All articles live under `content/` as Markdown files with gray-matter frontmatter (`title`, `date`).

```
content/
  articles/[category]/[year]/[month]/[date].md   # current articles
  archives/[category]/[year]/[month]/[date].md   # historical articles (2015–)
```

Non-Markdown files (PDFs, XLS, etc.) placed alongside `.md` files are copied to `public/` by `scripts/copy-content-resources.mjs`, which runs automatically before `dev` and `build`. The script also remaps `archives/` → `archives/articles/` in the destination path so URLs match the Next.js route structure.

**URL routes for articles:**
- `/articles/[category]/[year]/[month]/[date]`
- `/archives/articles/[category]/[year]/[month]/[date]`

Both routes share `ArticleDetailPage` (`src/component/common/article/ArticleDetailPage.tsx`) and use `generateStaticParams` to enumerate all `.md` files at build time.

### Article categories

Defined in `src/component/common/article/categoryMetadata.ts`:
`information`, `special`, `newsletters`, `clubs`, `ishikawa`, `national`, `results`, `reports`, `staff`, `seminars`, `activity`

### Adding a new article

1. Create `content/articles/[category]/[year]/[month]/[date].md` with frontmatter `title` and `date`.
2. Place any supporting files (PDF, XLSX…) in the same directory — they are served from `/articles/[category]/[year]/[month]/[filename]`.
3. If the article should appear on the homepage "新着情報" list, add an `<ArticleHeader>` entry to `src/component/top/information/information.tsx`.

For archive articles use `content/archives/[category]/[year]/[month]/[date].md`; no manual listing step is required (they are linked directly).

### Component layout

```
src/component/
  common/
    article/   # Article renderer (react-markdown + rehype-sanitize), ArticleHeader list item, ArticleDetailPage, categoryMetadata
    header/    # Sticky nav with hamburger menu; menu structure in menu.json
    footer/
    title/
  top/
    carousel/  # Homepage image slider
    information/  # Homepage "新着情報" — article list is hardcoded here
    special/
    sponsorship/
  utils/fonts/ # Geist + NotoSerifJP font definitions
```

### Styling

Tailwind CSS v4 via `@tailwindcss/postcss`. Configuration is in `tailwind.config.mjs`.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import fg from "fast-glob";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

// プロジェクト直下の .env から SITE_URL などを読み込む（無ければ既定値を使う）
try {
  process.loadEnvFile(path.join(ROOT, ".env"));
} catch {
  /* .env が存在しない環境では既定値にフォールバック */
}

const APP_DIR = path.join(ROOT, "src", "app");
const CONTENT_DIR = path.join(ROOT, "content");
const OUT_FILE = path.join(ROOT, "public", "sitemap.xml");

// 本番ドメイン。CI やローカルで環境変数 `SITE_URL` を指定すると差し替わる。
const DEFAULT_SITE_URL = "https://i-sho-spo.sakura.ne.jp";
const SITE_URL = (process.env.SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");

if (!process.env.SITE_URL) {
  console.warn(
    `[generate-sitemap] 環境変数 SITE_URL が未設定のため、デフォルトの ${SITE_URL} で生成します。`,
  );
}

// next.config.ts の trailingSlash: true に合わせ、全 URL を末尾スラッシュで揃える
const withTrailingSlash = (p) => (p === "/" ? "/" : p.replace(/\/?$/, "/"));
const toLoc = (route) => `${SITE_URL}${withTrailingSlash(route)}`;

// 記事ルートの generateStaticParams と同じカテゴリ許可リスト
// （src/app/articles/.../page.tsx・src/app/archives/.../page.tsx と揃える）
const ARTICLE_CATEGORIES = new Set([
  "information",
  "special",
  "newsletters",
  "ishikawa",
  "national",
  "results",
  "reports",
  "staff",
  "seminars",
  "recruitment",
  "activity",
]);

/**
 * src/app 以下の page.tsx から静的ルートを収集する。
 * 動的セグメント（[param]）・ルートグループ（(group)）・並列ルート（@slot）は除外。
 */
function collectStaticRoutes() {
  const pages = fg.sync("**/page.{tsx,ts,jsx,js,mdx}", { cwd: APP_DIR });
  const routes = [];

  for (const page of pages) {
    const segments = path.dirname(page).split("/").filter((s) => s && s !== ".");
    if (segments.some((s) => s.startsWith("[") || s.startsWith("@"))) continue;
    const visible = segments.filter((s) => !(s.startsWith("(") && s.endsWith(")")));
    routes.push("/" + visible.join("/"));
  }

  return routes;
}

/**
 * content/ 以下の Markdown から記事ルートを収集する。
 *   content/articles/<cat>/<y>/<m>/<n>.md          -> /articles/<cat>/<y>/<m>/<n>
 *   content/archives/<cat>/<y>/<m>/<n>.md          -> /archives/articles/<cat>/<y>/<m>/<n>
 * lastmod は frontmatter の date、無ければファイルの更新日時。
 */
function collectArticleRoutes() {
  const entries = [];

  for (const [contentRoot, urlPrefix] of [
    ["articles", "/articles"],
    ["archives", "/archives/articles"],
  ]) {
    const files = fg.sync(`${contentRoot}/*/*/*/*.md`, { cwd: CONTENT_DIR });
    for (const file of files) {
      const [category, year, month, number] = file
        .replace(`${contentRoot}/`, "")
        .replace(/\.md$/, "")
        .split("/");
      if (!ARTICLE_CATEGORIES.has(category)) continue;

      const abs = path.join(CONTENT_DIR, file);
      let lastmod;
      try {
        const { data } = matter.read(abs);
        const d = data?.date ? new Date(data.date) : null;
        if (d && !Number.isNaN(d.getTime())) lastmod = d;
      } catch {
        /* frontmatter が読めなければ mtime にフォールバック */
      }
      if (!lastmod) lastmod = fs.statSync(abs).mtime;

      entries.push({
        route: `${urlPrefix}/${category}/${year}/${month}/${number}`,
        lastmod,
      });
    }
  }

  return entries;
}

function priorityFor(route) {
  if (route === "/") return "1.0";
  if (route.startsWith("/articles/") || route.startsWith("/archives/articles/")) return "0.5";
  return "0.7";
}

function changefreqFor(route) {
  if (route === "/") return "weekly";
  if (route.startsWith("/articles/") || route.startsWith("/archives/articles/")) return "monthly";
  return "yearly";
}

function buildXml(urls) {
  const body = urls
    .map(({ loc, lastmod, changefreq, priority }) => {
      const lines = [`    <loc>${loc}</loc>`];
      if (lastmod) lines.push(`    <lastmod>${lastmod}</lastmod>`);
      if (changefreq) lines.push(`    <changefreq>${changefreq}</changefreq>`);
      if (priority) lines.push(`    <priority>${priority}</priority>`);
      return `  <url>\n${lines.join("\n")}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

function main() {
  const buildDate = new Date().toISOString().slice(0, 10);

  const staticEntries = collectStaticRoutes().map((route) => ({
    route,
    lastmod: buildDate,
  }));
  const articleEntries = collectArticleRoutes().map((e) => ({
    route: e.route,
    lastmod: e.lastmod.toISOString().slice(0, 10),
  }));

  // ルート重複を排除（静的ルートを優先）
  const byRoute = new Map();
  for (const e of [...staticEntries, ...articleEntries]) {
    if (!byRoute.has(e.route)) byRoute.set(e.route, e);
  }

  const urls = [...byRoute.values()]
    .sort((a, b) => a.route.localeCompare(b.route))
    .map(({ route, lastmod }) => ({
      loc: toLoc(route),
      lastmod,
      changefreq: changefreqFor(route),
      priority: priorityFor(route),
    }));

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, buildXml(urls));
  console.log(
    `[generate-sitemap] ${urls.length} URLs written to public/sitemap.xml (base: ${SITE_URL})`,
  );
}

main();

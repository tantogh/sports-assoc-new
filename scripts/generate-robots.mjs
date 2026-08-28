import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_FILE = path.join(ROOT, "public", "robots.txt");

// プロジェクト直下の .env から SITE_URL などを読み込む（無ければ既定値を使う）
try {
  process.loadEnvFile(path.join(ROOT, ".env"));
} catch {
  /* .env が存在しない環境では既定値にフォールバック */
}

// 本番ドメイン。generate-sitemap.mjs と揃える（環境変数 SITE_URL で差し替え可能）。
const DEFAULT_SITE_URL = "https://i-sho-spo.sakura.ne.jp";
const SITE_URL = (process.env.SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");

if (!process.env.SITE_URL) {
  console.warn(
    `[generate-robots] 環境変数 SITE_URL が未設定のため、デフォルトの ${SITE_URL} で生成します。`,
  );
}

const body = [
  "User-agent: *",
  "Allow: /",
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
  "",
].join("\n");

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, body);
console.log(`[generate-robots] public/robots.txt written (sitemap: ${SITE_URL}/sitemap.xml)`);

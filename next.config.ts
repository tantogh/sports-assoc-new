import crypto from "crypto";
import fs from "fs";
import glob from "fast-glob";
import type { NextConfig } from "next";

// コードと依存関係が同じならビルド ID も同じにする。
// 記事を追加しただけのビルドで既存ページの HTML が変わらないようにし、同期の転送量を抑える。
const BUILD_ID_INPUTS = ["src/**", "pnpm-lock.yaml", "next.config.ts", ".env", ".env.production"];

async function generateBuildId() {
  const files = await glob(BUILD_ID_INPUTS, { dot: true });
  const hash = crypto.createHash("sha256");
  for (const file of files.sort()) {
    hash.update(file);
    hash.update(fs.readFileSync(file));
  }
  return hash.digest("hex").slice(0, 21);
}

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  generateBuildId,
};

export default nextConfig;

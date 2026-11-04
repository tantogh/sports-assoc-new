import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// next build は out/ を毎回作り直すため、内容が同じファイルも更新日時が新しくなる。
// 内容が前回と同じファイルの更新日時を前回の値に戻し、
// FTP クライアントの「新しいファイルのみ転送」で差分だけを同期できるようにする。

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "out");
const MANIFEST_FILE = path.join(ROOT, ".out-manifest.json");

function readManifest() {
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_FILE, "utf8"));
  } catch (err) {
    if (err.code === "ENOENT") return {};
    console.warn(`[preserve-out-mtimes] マニフェストを読めないため作り直します: ${err.message}`);
    return {};
  }
}

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else {
      yield fullPath;
    }
  }
}

function hashFile(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

const toMB = (bytes) => (bytes / 1024 / 1024).toFixed(1);

const previous = readManifest();
const next = {};
let unchanged = 0;
let changed = 0;
let added = 0;
let transferBytes = 0;

for (const file of walk(OUT_DIR)) {
  // マニフェストのキーは OS に依存しないよう / 区切りにする
  const rel = path.relative(OUT_DIR, file).split(path.sep).join("/");
  const hash = hashFile(file);
  const stat = fs.statSync(file);
  const prev = previous[rel];

  if (prev && prev.hash === hash) {
    const mtime = new Date(prev.mtimeMs);
    fs.utimesSync(file, mtime, mtime);
    next[rel] = prev;
    unchanged++;
  } else {
    next[rel] = { hash, mtimeMs: stat.mtimeMs };
    if (prev) changed++;
    else added++;
    transferBytes += stat.size;
  }
}

const removed = Object.keys(previous).filter((rel) => !(rel in next));

// 途中で失敗したときに前回の記録を壊さないよう、最後にまとめて書き込む
fs.writeFileSync(MANIFEST_FILE, JSON.stringify(next));

console.log(
  `[preserve-out-mtimes] 変更なし ${unchanged} / 変更 ${changed} / 新規 ${added} / 削除 ${removed.length}（転送対象 ${toMB(transferBytes)} MB）`,
);
if (removed.length > 0) {
  console.log("[preserve-out-mtimes] サーバーからも削除が必要なファイル:");
  for (const rel of removed) console.log(`  ${rel}`);
}

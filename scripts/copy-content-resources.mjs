import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content");
const PUBLIC_DIR = path.join(ROOT, "public");

let copied = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (path.extname(entry.name).toLowerCase() !== ".md") {
      const rel = path.relative(CONTENT_DIR, fullPath);
      const dest = path.join(PUBLIC_DIR, rel);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(fullPath, dest);
      copied++;
    }
  }
}

walk(CONTENT_DIR);
console.log(`[copy-content-resources] ${copied} files copied to public/`);

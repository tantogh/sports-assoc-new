// src/component/common/article/articleHeader.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

import { notoSerifJP } from "@/component/utils/fonts/fonts";
import { processTitle } from "./markdownProcessors";

type ArticleHeaderProps = {
  baseDir: string;     // e.g. "/articles/information"
  filePath: string;    // e.g. "/2018/01/2018-01-01.md"
};

/**
 * Markdown ファイルからタイトルを取得
 * frontmatter の title がなければ、最初の # 見出しを使用
 */
const getTitle = (data: Record<string, unknown>, content: string): string => {
  if (typeof data.title === "string" && data.title.length > 0) {
    return data.title;
  }

  const match = content.match(/^# (.+)$/m);
  return match ? match[1] : "タイトルなし";
};

/**
 * 日付をフォーマット（YYYY.MM.DD）
 */
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

export default function ArticleHeader({ baseDir, filePath }: ArticleHeaderProps) {
  const fullPath = path.join(process.cwd(), "content", baseDir, filePath);
  const href = path.join(baseDir, filePath.replace(/\.md$/, ""));
  const raw = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(raw);
  const title = getTitle(data, content);
  const date = new Date(data.date || "1970-01-01");

  return (
    <div className="max-w-2xl mx-auto mb-2 p-2 bg-white rounded-xl shadow-lg">
      <Link href={href} className="group block w-full">
        <div className="flex items-center justify-between gap-4 rounded-md px-3 transition-colors duration-200">
          <div
            className={`text-xs xl:text-xl p-1 text-black transition-colors duration-200 group-hover:text-sky-700 ${notoSerifJP.className}`}
          >
            <div className="text-xxs lg:text-sm text-sky-500 mb-1">{formatDate(date)}</div>
            {processTitle(title)}
          </div>

          <div className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-white/90 px-1 lg:px-3 py-[2px] lg:py-1 text-[8px] lg:text-[10px] font-semibold uppercase tracking-wide text-sky-700 transition-all duration-200 group-hover:border-sky-300 group-hover:bg-sky-200/60 group-hover:text-sky-800">
            <span>more</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M3.25 10a.75.75 0 0 1 .75-.75h10.19l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H4a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
}

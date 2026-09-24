// src/app/qa/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Metadata } from "next"

import Title from "@/component/common/title/title";
import { MarkdownContent } from "@/component/common/article/article";

export const metadata: Metadata = {
  title: "Q&A | 石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会のQ&Aのページです。",
}

// content/qa/qa.md の置き場所。添付ファイルは public/qa/ にコピーされる
const QA_DIR = "qa";
const QA_FILE = "qa.md";

type QAItem = {
  question: string;
  answer: string;
};

/**
 * Markdownを見出し1（"# "）ごとに区切り、見出しを質問・続く本文を回答とする。
 * コードブロック内の "#" は見出しとして扱わない。
 * 先頭に書かれた "Q." / "A." は表示側で付けるため取り除く。
 */
const parseQA = (markdown: string): QAItem[] => {
  const items: QAItem[] = [];
  let current: { question: string; lines: string[] } | null = null;
  let inFence = false;

  const flush = () => {
    if (!current) return;
    const answer = current.lines.join("\n").trim().replace(/^A[.．:：]\s*/i, "");
    items.push({ question: current.question, answer });
  };

  for (const line of markdown.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    const heading = !inFence && line.match(/^#\s+(.+?)\s*#*\s*$/);
    if (heading) {
      flush();
      current = { question: heading[1].replace(/^Q[.．:：]\s*/i, ""), lines: [] };
    } else if (current) {
      current.lines.push(line);
    }
  }
  flush();
  return items;
};

export default function QandAPage() {
  let items: QAItem[];
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), "content", QA_DIR, QA_FILE), "utf8");
    items = parseQA(matter(raw).content);
  } catch (err) {
    items = [];
    console.error(`Q&Aの読み込みに失敗しました: ${(err as Error).message}`);
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-2 mb-8 lg:px-4">
        <Title subTitle="Q&A" title="パラスポーツQ&A" />
        {items.length > 0 && (
          <div className="mx-auto w-full max-w-4xl space-y-4 p-4">
            {items.map((item, i) => (
              <section
                key={i}
                className="rounded-xl border border-blue-100 bg-white p-4 md:p-6 text-slate-800 shadow-md"
              >
                <h2 className="flex gap-2 text-base sm:text-lg font-bold text-sky-700">
                  <span aria-hidden="true">Q.</span>
                  <span>{item.question}</span>
                </h2>
                <div className="mt-3 flex gap-2 border-t border-blue-100 pt-3">
                  <span aria-hidden="true" className="font-bold text-rose-600 leading-8">A.</span>
                  <div className="min-w-0 flex-1 prose prose-ul:list-disc prose-ol:list-decimal prose-li:my-0 prose-li:pl-0 max-w-none">
                    <MarkdownContent content={item.answer} baseDir={QA_DIR} />
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import glob from "fast-glob";
import Link from "next/link";
import { Metadata } from "next";
import Title from "@/component/common/title/title";
import { categoryMetadata } from "@/component/common/article/categoryMetadata";

export const metadata: Metadata = {
  title: "過去記事 | 石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会の過去記事のページです。",
};

type ArticleEntry = {
  category: string;
  year: string;
  month: string;
  date: string;
  title: string;
  dateStr: string;
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr || "1970-01-01");
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

async function getAllArchiveArticles(): Promise<ArticleEntry[]> {
  const files = await glob("content/archives/**/*.md");
  const entries: ArticleEntry[] = [];

  for (const file of files) {
    // content/archives/[category]/[year]/[month]/[date].md
    const rel = file.replace("content/archives/", "");
    const parts = rel.split("/");
    if (parts.length !== 4) continue;
    const [category, year, month, filename] = parts;
    const date = filename.replace(".md", "");

    const raw = fs.readFileSync(path.join(process.cwd(), file), "utf8");
    const { data } = matter(raw);
    const title =
      typeof data.title === "string" && data.title.length > 0
        ? data.title
        : "タイトルなし";
    const dateStr =
      typeof data.date === "string" ? data.date : `${year}-${month}-${date.split("-").pop()}`;

    entries.push({ category, year, month, date, title, dateStr });
  }

  // newest first within each group
  entries.sort((a, b) => b.dateStr.localeCompare(a.dateStr));
  return entries;
}

export default async function Archives() {
  const articles = await getAllArchiveArticles();

  // Group: category → year → entries[]
  const grouped: Record<string, Record<string, ArticleEntry[]>> = {};
  for (const entry of articles) {
    grouped[entry.category] ??= {};
    grouped[entry.category][entry.year] ??= [];
    grouped[entry.category][entry.year].push(entry);
  }

  const categoryOrder = Object.keys(categoryMetadata).filter((c) => grouped[c]);

  return (
    <div className="max-w-7xl mx-auto px-2 mb-8 lg:px-4">
      <Title subTitle="ARCHIVES" title="過去記事" />

      {categoryOrder.map((category, i) => {
        const meta = categoryMetadata[category];
        const yearGroups = grouped[category];
        const years = Object.keys(yearGroups).sort((a, b) => Number(b) - Number(a));

        return (
          <div key={category}>
            {i > 0 && <hr className="my-8 border-slate-300" />}

            <h2 className="text-center mb-1">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-600">
                {meta.subTitle}
              </span>
              <span className="text-lg lg:text-xl font-bold text-slate-900">
                {meta.title}
              </span>
            </h2>

            {years.map((year) => (
              <div key={year} className="mt-6">
                <div className="flex items-center gap-3 mb-3 max-w-2xl mx-auto">
                  <span className="text-sm font-semibold text-slate-500">{year}年</span>
                  <div className="flex-1 border-t border-slate-200" />
                </div>

                <div className="space-y-2">
                  {yearGroups[year].map((entry) => {
                    const href = `/archives/articles/${entry.category}/${entry.year}/${entry.month}/${entry.date}`;
                    return (
                      <div
                        key={href}
                        className="max-w-2xl mx-auto p-2 bg-white rounded-xl shadow-lg"
                      >
                        <Link href={href} className="group flex items-center justify-between gap-4 rounded-md px-3 transition-colors duration-200">
                          <div className="text-sm lg:text-xl p-1 text-black transition-colors duration-200 group-hover:text-sky-700">
                            <div className="text-xxs lg:text-sm text-sky-500 mb-1">
                              {formatDate(entry.dateStr)}
                            </div>
                            {entry.title}
                          </div>
                          <div className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-white/90 px-1 lg:px-3 py-[2px] lg:py-1 text-[8px] lg:text-[10px] font-semibold uppercase tracking-wide text-sky-700 transition-all duration-200 group-hover:border-sky-300 group-hover:bg-sky-200/60 group-hover:text-sky-800 shrink-0">
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
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

// src/app/events/reports/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";
import ArticleHeader from "@/component/common/article/articleHeader";

export const metadata: Metadata = {
  title: "事業報告 | 大会・イベント | 石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会の大会事業報告のページです。",
}

export default function ResultsPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-2 mb-8 lg:px-4">
        <Title subTitle="REPORTS" title="事業報告" />
        <ArticleHeader baseDir="/articles/reports" filePath="/2026/05/2026-05-01.md" />
      </div>
    </>
  );
};

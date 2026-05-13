// src/app/events/results/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";
import ArticleHeader from "@/component/common/article/articleHeader";

export const metadata: Metadata = {
  title: "大会結果 | 大会・イベント | 石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会の大会結果のページです。",
}

export default function ResultsPage() {
  return (
    <>
      <Title subTitle="RESULTS" title="大会結果" />
      <ArticleHeader baseDir="/articles/results" filePath="/2026/05/2026-05-01.md" />
    </>
  );
};

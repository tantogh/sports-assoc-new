// src/app/about/newsletter/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";
import ArticleHeader from "@/component/common/article/articleHeader";

export const metadata: Metadata = {
  title: "協会だより | 協会概要 | 石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会の協会だよりのページです。",
}

export default function Newsletters() {
  return (
    <>
      <Title subTitle="NEWSLETTERS" title="協会だより" />
      <div className="max-w-7xl mx-auto px-4">
        <ArticleHeader baseDir="/articles/newsletters/" filePath="/2026/05/2026-05-01.md" />
      </div>
    </>
  );
};
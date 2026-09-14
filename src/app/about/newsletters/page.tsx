// src/app/about/newsletters/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";
import ArticleHeader from "@/component/common/article/articleHeader";
import glob from "fast-glob";

export const metadata: Metadata = {
  title: "協会だより | 協会概要 | 石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会の協会だよりのページです。",
}

export default async function Newsletters() {
  const baseDir = "articles/newsletters";
  const files = await glob(`content/${baseDir}/*/*/*.md`);
  const filePaths = files
    .map((file) => file.replace(`content/${baseDir}`, ""))
    .sort()
    .reverse();

  return (
    <>
      <div className="max-w-7xl mx-auto px-2 mb-8 lg:px-4">
        <Title subTitle="NEWSLETTERS" title="協会だより" />
        {filePaths.map((filePath) => (
          <ArticleHeader key={filePath} baseDir={baseDir} filePath={filePath} />
        ))}
      </div>
    </>
  );
};

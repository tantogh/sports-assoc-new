// src/app/tournaments/national/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";
import ArticleHeader from "@/component/common/article/articleHeader";
import glob from "fast-glob";

export const metadata: Metadata = {
  title: "全国障害者スポーツ大会 | スポーツ大会 | 石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会の全国障害者スポーツ大会のページです。",
}

export default async function NationalPage() {
  const baseDir = "articles/national";
  const files = await glob(`content/${baseDir}/*/*/*.md`);
  const filePaths = files
    .map((file) => file.replace(`content/${baseDir}`, ""))
    .sort()
    .reverse();

  return (
    <>
      <div className="max-w-7xl mx-auto px-2 mb-8 lg:px-4">
        <Title subTitle="TOURNAMENTS" title="全国障害者スポーツ大会" />
        {filePaths.map((filePath) => (
          <ArticleHeader key={filePath} baseDir={baseDir} filePath={filePath} />
        ))}
      </div>
    </>
  );
};

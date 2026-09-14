// src/app/staff/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";
import ArticleHeader from "@/component/common/article/articleHeader";
import glob from "fast-glob";

export const metadata: Metadata = {
  title: "ボランティア・スタッフ募集について | 大会・イベント|石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会のボランティア・スタッフ募集についてのページです。",
}

export default async function StaffPage() {
  const baseDir = "articles/staff";
  const files = await glob(`content/${baseDir}/*/*/*.md`);
  const filePaths = files
    .map((file) => file.replace(`content/${baseDir}`, ""))
    .sort()
    .reverse();

  return (
    <>
      <div className="max-w-7xl mx-auto px-2 mb-8 lg:px-4">
        <Title subTitle="STAFF" title="ボランティア・スタッフ募集について" />
        {filePaths.map((filePath) => (
          <ArticleHeader key={filePath} baseDir={baseDir} filePath={filePath} />
        ))}
      </div>
    </>
  );
};

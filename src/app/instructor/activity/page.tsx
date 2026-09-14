// src/app/instructor/activity/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";
import ArticleHeader from "@/component/common/article/articleHeader";
import glob from "fast-glob";

export const metadata: Metadata = {
  title: "指導員活動報告 | 指導員情報 | 石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会のパラスポーツ指導員活動報告のページです。",
}

export default async function ActivityPage() {
  const baseDir = "articles/activity";
  const files = await glob(`content/${baseDir}/*/*/*.md`);
  const filePaths = files
    .map((file) => file.replace(`content/${baseDir}`, ""))
    .sort()
    .reverse();

  return (
    <>
      <div className="max-w-7xl mx-auto px-2 mb-8 lg:px-4">
        <Title subTitle="ACTIVITY" title="パラスポーツ指導員活動報告" />
        {filePaths.map((filePath) => (
          <ArticleHeader key={filePath} baseDir={baseDir} filePath={filePath} />
        ))}
      </div>
    </>
  );
};

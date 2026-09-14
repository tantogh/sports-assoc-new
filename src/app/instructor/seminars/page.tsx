// src/app/instructor/seminars/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";
import ArticleHeader from "@/component/common/article/articleHeader";
import glob from "fast-glob";

export const metadata: Metadata = {
  title: "指導員養成講習会 | 指導員情報 | 石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会のパラスポーツ指導員養成講習会のページです。",
}

export default async function SeminarsPage() {
  const baseDir = "articles/seminars";
  const files = await glob(`content/${baseDir}/*/*/*.md`);
  const filePaths = files
    .map((file) => file.replace(`content/${baseDir}`, ""))
    .sort()
    .reverse();

  return (
    <>
      <div className="max-w-7xl mx-auto px-2 mb-8 lg:px-4">
        <Title subTitle="SEMINARS" title="パラスポーツ指導員養成講習会" />
        {filePaths.map((filePath) => (
          <ArticleHeader key={filePath} baseDir={baseDir} filePath={filePath} />
        ))}
      </div>
    </>
  );
};

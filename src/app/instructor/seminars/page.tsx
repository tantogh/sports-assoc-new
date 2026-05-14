// src/app/instructor/seminars/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";
import Article from "@/component/common/article/article";
import ArticleHeader from "@/component/common/article/articleHeader";

export const metadata: Metadata = {
  title: "指導員養成講習会 | 指導員情報 | 石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会のパラスポーツ指導員養成講習会のページです。",
}

export default function SeminarsPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-2 lg:px-4">
        <Title subTitle="SEMINARS" title="パラスポーツ指導員養成講習会" />
        <ArticleHeader baseDir="/articles/seminars" filePath="/2026/05/2026-05-01.md" />
      </div>
    </>
  );
};

// src/app/clubs/reports/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";
import ArticleHeader from "@/component/common/article/articleHeader";

export const metadata: Metadata = {
  title: "クラブ報告 | クラブ情報 | 石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会のクラブ報告のページです。",
}

export default function Reports() {
  return (
    <>
      <Title subTitle="REPORTS" title="クラブ報告" />
      <div className="max-w-7xl mx-auto px-4">
        <ArticleHeader baseDir="/articles/clubs/" filePath="/2026/05/2026-05-01.md"/>
      </div>
    </>
  );
};

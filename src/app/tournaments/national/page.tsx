// src/app/tournaments/national/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";
import ArticleHeader from "@/component/common/article/articleHeader";

export const metadata: Metadata = {
  title: "全国障害者スポーツ大会 | スポーツ大会 | 石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会の全国障害者スポーツ大会のページです。",
}

export default function NationalPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-2 lg:px-4">
        <Title subTitle="TOURNAMENTS" title="全国障害者スポーツ大会" />
        <ArticleHeader baseDir="/articles/national" filePath="/2026/05/2026-05-01.md" />
      </div>
    </>
  );
};

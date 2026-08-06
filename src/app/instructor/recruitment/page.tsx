// src/app/instructor/recruitment/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";
import ArticleHeader from "@/component/common/article/articleHeader";

export const metadata: Metadata = {
  title: "パラスポーツ指導員募集 | 指導員 | 石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会の指導員募集のページです。",
}

export default function RecruitmentPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-2 mb-8 lg:px-4">
        <Title subTitle="RECRUITMENT" title="パラスポーツ指導員募集" />
        {/* <ArticleHeader baseDir="/articles/recruitment" filePath="/2026/08/2026-08-01.md" /> */}
      </div>
    </>
  );
};

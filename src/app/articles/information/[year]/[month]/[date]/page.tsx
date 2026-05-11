// src/app/articles/information/[year]/[month]/[date]/page.tsx
import { Metadata } from "next";
import ArticleDetailPage, { generateArticleStaticParams } from "@/component/common/article/ArticleDetailPage";

export const metadata: Metadata = {
  title: "新着情報 | 石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会の新着情報ページです。",
};

export const generateStaticParams = generateArticleStaticParams("information");

export default function Page({ params }: any) {
  return <ArticleDetailPage category="information" subTitle="INFORMATION" title="新着情報" params={params} />;
}

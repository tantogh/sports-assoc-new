import { Metadata } from "next";
import ArticleDetailPage, { generateArticleStaticParams } from "@/component/common/article/ArticleDetailPage";

export const metadata: Metadata = {
  title: "協会だより | 石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会の会報ページです。",
};

export const generateStaticParams = generateArticleStaticParams("newsletters");

export default function Page({ params }: any) {
  return <ArticleDetailPage category="newsletters" subTitle="NEWSLETTERS" title="協会だより" params={params} />;
}

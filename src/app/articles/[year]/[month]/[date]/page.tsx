// src/app/article/[year]/[month]/[date]/page.tsx
import { Metadata } from "next"
import glob from "fast-glob";

import Article from "@/component/common/article/article";
import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "新着記事 | 石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会の新着記事ページです。",
}

type ArticleProps = {
  params: Promise<{
    year: string;
    month: string;
    date: string;
  }>;
};

// 【SSG必須】ビルド時に実行され、生成すべきページのURLリスト(params)を作成する
export async function generateStaticParams() {
  // 1. content/articles 以下の .md ファイルをすべて取得（ビルド時に1回だけ実行されます）
  const files = await glob("content/articles/*/*/*.md");

  // 2. ファイルパスから year, month, date を抽出し、リストとして返す
  return files.map((file) => {
    // 例: "content/articles/2024/03/15.md" -> ["2024", "03", "15"]
    const [year, month, date] = file
      .replace("content/articles/", "")
      .replace(".md", "")
      .split("/");

    return { year, month, date };
  });
}

// ビルド時、generateStaticParamsでリストアップされたURLごとにこのコンポーネントが実行され、静的HTMLが作られる
const ArticlePage = async ({ params }: ArticleProps) => {
  const { year, month, date } = await params;

  // URLのパラメータから、読み込むべきファイル名を特定
  const filename = `articles/${year}/${month}/${date}.md`;

  return (
    <>
      <Title subTitle="INFORMATION" title="新着情報" />
      <Article filename={filename} />
    </>
  );
};

export default ArticlePage;

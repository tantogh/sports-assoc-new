// src/app/articles/information/[year]/[month]/[date]/page.tsx
import { Metadata } from "next"
import Link from "next/link";
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
  // 1. content/articles/information 以下の .md ファイルをすべて取得（ビルド時に1回だけ実行されます）
  const files = await glob("content/articles/information/*/*/*.md");

  // informationパス以降のみ抽出し、year, month, dateを取得する
  return files.map((file) => {
    // 例: "content/articles/information/2026/03/2026-03-02.md" -> ["2026", "03", "2026-03-02"]
    const [year, month, date] = file
      .replace("content/articles/information/", "")
      .replace(".md", "")
      .split("/");
    return { year, month, date };
  });
}

// ビルド時、generateStaticParamsでリストアップされたURLごとにこのコンポーネントが実行され、静的HTMLが作られる
const ArticlePage = async ({ params }: ArticleProps) => {
  const { year, month, date } = await params;

  // URLのパラメータから、読み込むべきファイル名を特定
  const filename = `articles/information/${year}/${month}/${date}.md`;

  return (
    <>
      <Title subTitle="INFORMATION" title="新着情報" />
      <Article filename={filename} />
      <div className="flex justify-center pb-4">
        <Link
          href="/"
          className="text-xs px-1 lg:text-base inline-block lg:px-4 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition whitespace-nowrap"
        >
          トップに戻る
        </Link>
      </div>
    </>
  );
};

export default ArticlePage;

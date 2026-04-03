// /src/app/article/[year]/[month]/[date]/page.tsx

import glob from "fast-glob";

import Header from "@/component/common/header/header";
import Article from "@/component/common/article/article";
import Title from "@/component/common/title/title";

type ArticleProps = {
  params: Promise<{
    year: string;
    month: string;
    date: string;
  }>;
};

// fast-glob を使ってネストを排除
export async function generateStaticParams() {
  // content/articles 以下の .md ファイルをすべて取得
  const files = await glob("content/articles/*/*/*.md");

  return files.map((file) => {
    // 例: "content/articles/2024/03/15.md" -> ["2024", "03", "15"]
    const [year, month, date] = file
      .replace("content/articles/", "")
      .replace(".md", "")
      .split("/");

    return { year, month, date };
  });
}

const ArticlePage = async ({ params }: ArticleProps) => {
  const { year, month, date } = await params;
  const filename = `articles/${year}/${month}/${date}.md`;

  return (
    <>
      <Header />
      <Title title="新着情報" />
      <Article filename={filename} />
    </>
  );
};

export default ArticlePage;
// /src/app/article/[year]/[month]/[date]/page.tsx

import fs from "fs";
import path from "path";

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

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "content", "articles");

  const posts = fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .flatMap((yearDir) => {
      if (!yearDir.isDirectory()) return [];

      const yearPath = path.join(postsDirectory, yearDir.name);

      return fs
        .readdirSync(yearPath, { withFileTypes: true })
        .flatMap((monthDir) => {
          if (!monthDir.isDirectory()) return [];

          const monthPath = path.join(yearPath, monthDir.name);

          return fs
            .readdirSync(monthPath, { withFileTypes: true })
            .filter((file) => file.isFile() && file.name.endsWith(".md"))
            .map((file) => ({
              year: yearDir.name,
              month: monthDir.name,
              date: file.name.replace(/\.md$/, ""),
            }));
        });
    });

  return posts.map((post) => ({
    year: post.year,
    month: post.month,
    date: post.date,
  }));
}

const  ArticlePage = async({ params }: ArticleProps) => {
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
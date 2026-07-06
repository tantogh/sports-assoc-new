// src/component/common/article/ArticleDetailPage.tsx
import Article from "@/component/common/article/article";
import Title from "@/component/common/title/title";
import glob from "fast-glob";

export type ArticlePageParams = {
  year: string;
  month: string;
  number: string;
};

export type ArticleDetailPageProps = {
  category: string;
  subTitle: string;
  title: string;
  params: ArticlePageParams;
  contentRoot?: string;
};

// SSG: 各カテゴリの静的パス生成用高階関数
export function generateArticleStaticParams(category: string, contentRoot = "articles") {
  return async function() {
    const files = await glob(`content/${contentRoot}/${category}/*/*/*.md`);
    return files.map((file) => {
      const [year, month, number] = file
        .replace(`content/${contentRoot}/${category}/`, "")
        .replace(".md", "")
        .split("/");
      return { year, month, number };
    });
  };
}

export default function ArticleDetailPage({ category, subTitle, title, params, contentRoot = "articles" }: ArticleDetailPageProps) {
  const { year, month, number } = params;
  const filename = `${contentRoot}/${category}/${year}/${month}/${number}.md`;
  return (
    <>
      <Title subTitle={subTitle} title={title} />
      <Article filename={filename} />
    </>
  );
}

// src/component/common/article/ArticleDetailPage.tsx
import Link from "next/link";
import Article from "@/component/common/article/article";
import Title from "@/component/common/title/title";
import glob from "fast-glob";

export type ArticlePageParams = {
  year: string;
  month: string;
  date: string;
};

export type ArticleDetailPageProps = {
  category: string;
  subTitle: string;
  title: string;
  params: ArticlePageParams;
};

// SSG: 各カテゴリの静的パス生成用高階関数
export function generateArticleStaticParams(category: string) {
  return async function() {
    const files = await glob(`content/articles/${category}/*/*/*.md`);
    return files.map((file) => {
      const [year, month, date] = file
        .replace(`content/articles/${category}/`, "")
        .replace(".md", "")
        .split("/");
      return { year, month, date };
    });
  };
}

export default function ArticleDetailPage({ category, subTitle, title, params }: ArticleDetailPageProps) {
  const { year, month, date } = params;
  const filename = `articles/${category}/${year}/${month}/${date}.md`;
  return (
    <>
      <Title subTitle={subTitle} title={title} />
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
}

import { Metadata } from "next";
import ArticleDetailPage, { generateArticleStaticParams } from "@/component/common/article/ArticleDetailPage";
import { categoryMetadata } from "@/component/common/article/categoryMetadata";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const meta = categoryMetadata[category] || categoryMetadata.information;

  return {
    title: `${meta.title} | 石川県パラスポーツ協会`,
    description: meta.description,
  };
}

export const generateStaticParams = async () => {
  const categories = ["information", "special", "newsletters", "clubs", "ishikawa", "national", "results", "reports", "activity"];
  const allParams = [];

  for (const category of categories) {
    const categoryParams = await generateArticleStaticParams(category)();
    allParams.push(
      ...categoryParams.map((param: any) => ({
        category,
        ...param,
      }))
    );
  }

  return allParams;
};

export default async function Page({ params }: any) {
  const { category, year, month, date } = await params;
  const meta = categoryMetadata[category] || categoryMetadata.information;

  return (
    <>
      <ArticleDetailPage
        category={category}
        subTitle={meta.subTitle}
        title={meta.title}
        params={{ year, month, date }}
      />
      <div className="flex justify-center mb-8">
        <Link href={`${meta.url}`} passHref>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            一覧へ戻る
          </button>
        </Link>
      </div>
    </>
  );
}

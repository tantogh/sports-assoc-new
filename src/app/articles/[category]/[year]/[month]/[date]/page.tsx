import { Metadata } from "next";
import ArticleDetailPage, { generateArticleStaticParams } from "@/component/common/article/ArticleDetailPage";
import { categoryMetadata } from "@/component/common/article/categoryMetadata";

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
  const categories = ["information", "newsletters"];
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
    <ArticleDetailPage
      category={category}
      subTitle={meta.subTitle}
      title={meta.title}
      params={{ year, month, date }}
    />
  );
}

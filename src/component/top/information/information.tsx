// src/component/top/information/information.tsx

import ArticleHeader from "@/component/common/article/articleHeader";
import glob from "fast-glob";

export default async function Information() {
  const baseDir = "articles/information";
  const files = await glob(`content/${baseDir}/*/*/*.md`);
  const filePaths = files
    .map((file) => file.replace(`content/${baseDir}`, ""))
    .sort()
    .reverse();

  return (
    <section className="w-full">
      {/* 記事一覧（自動生成） */}
      {filePaths.map((filePath) => (
        <ArticleHeader key={filePath} baseDir={baseDir} filePath={filePath} />
      ))}
    </section>
  );
};

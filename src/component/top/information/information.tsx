// src/component/top/information/information.tsx

import ArticleHeader from "@/component/common/article/articleHeader";

export default function Information() {
  return (
    <section className="w-full">
      {/* 記事一覧 */}
      <ArticleHeader baseDir="articles/information" filePath="/2026/06/2026-06-22.md" />
      <ArticleHeader baseDir="articles/information" filePath="/2026/06/2026-06-15.md" />
      <ArticleHeader baseDir="articles/information" filePath="/2026/06/2026-06-08.md" />
      <ArticleHeader baseDir="articles/information" filePath="/2026/03/2026-03-02.md" />
      <ArticleHeader baseDir="articles/information" filePath="/2026/03/2026-03-01.md" />
      <ArticleHeader baseDir="articles/information" filePath="/2026/02/2026-02-03.md" />
      <ArticleHeader baseDir="articles/information" filePath="/2026/02/2026-02-02.md" />
      <ArticleHeader baseDir="articles/information" filePath="/2026/02/2026-02-01.md" />
      <ArticleHeader baseDir="articles/information" filePath="/2026/01/2026-01-01.md" />
    </section>
  );
};
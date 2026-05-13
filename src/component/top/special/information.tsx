// src/component/top/information/information.tsx

import ArticleHeader from "@/component/common/article/articleHeader";

export default function Information() {
  return (
    <section className="w-full py-2">
      {/* 記事一覧 */}
      <ArticleHeader baseDir="articles/information" filePath="/2026/02/2026-02-03.md" />
    </section>
  );
};

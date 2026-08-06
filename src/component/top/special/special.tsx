// src/component/top/special/special.tsx
import ArticleHeader from "@/component/common/article/articleHeader";

export default function Special() {
  return (
    <section className="w-full">
      {/* 記事一覧 */}
      <ArticleHeader baseDir="articles/special" filePath="/2026/09/2026-09-01.md" />
    </section>
  );
};

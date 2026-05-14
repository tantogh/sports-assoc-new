// src/component/top/special/special.tsx
import ArticleHeader from "@/component/common/article/articleHeader";

export default function Special() {
  return (
    <section className="w-full py-2">
      {/* 記事一覧 */}
      <ArticleHeader baseDir="articles/special" filePath="/2026/05/2026-05-01.md" />
    </section>
  );
};

// /src/component/top/special/specialInfo.tsx

import Title from "@/component/common/title/title";
import ArticleHeader from "@/component/common/article/articleHeader";

const SpecialInfo = () => {
  return (
    <section className="w-full bg-sky-100/80 py-2">
      <Title title="特別情報" />
      <div className="rounded-xl border border-sky-100/80 bg-white/70 p-4 md:p-6">
        {/* 記事一覧 */}
        <ArticleHeader baseDir="articles" filePath="/2026/03/2026-03-02.md" href="/article/2026/03/2026-03-02" />
        <ArticleHeader baseDir="articles" filePath="/2026/03/2026-03-01.md" href="/article/2026/03/2026-03-01" />
        <ArticleHeader baseDir="articles" filePath="/2026/02/2026-02-03.md" href="/article/2026/02/2026-02-03" />
        <ArticleHeader baseDir="articles" filePath="/2026/02/2026-02-02.md" href="/article/2026/02/2026-02-02" />
        <ArticleHeader baseDir="articles" filePath="/2026/02/2026-02-01.md" href="/article/2026/02/2026-02-01" />
        <ArticleHeader baseDir="articles" filePath="/2026/01/2026-01-01.md" href="/article/2026/01/2026-01-01" />
      </div>
    </section>
  );
};

export default SpecialInfo;
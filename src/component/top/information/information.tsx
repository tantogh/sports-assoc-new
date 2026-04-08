// /src/component/top/information/information.tsx

import ArticleHeader from "@/component/common/article/articleHeader";

const Information = () => {
  return (
    <section className="w-full py-2">
      <div className="rounded-xl bg-white/70 p-4 md:p-6">
        {/* 記事一覧 */}
        <ArticleHeader baseDir="articles" filePath="/2026/03/2026-03-02.md" />
        <ArticleHeader baseDir="articles" filePath="/2026/03/2026-03-01.md" />
        <ArticleHeader baseDir="articles" filePath="/2026/02/2026-02-03.md" />
        <ArticleHeader baseDir="articles" filePath="/2026/02/2026-02-02.md" />
        <ArticleHeader baseDir="articles" filePath="/2026/02/2026-02-01.md" />
        <ArticleHeader baseDir="articles" filePath="/2026/01/2026-01-01.md" />
      </div>
    </section>
  );
};

export default Information;
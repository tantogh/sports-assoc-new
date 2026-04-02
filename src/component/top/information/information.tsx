// /src/component/top/information/information.tsx

import Title from "@/component/common/title/title";
import ArticleHeader from "@/component/common/article/articleHeader";

const Information = () => {
  return (
    <section className="w-full bg-sky-100/80 py-2">
      <Title title="新着情報" />
      <div className="rounded-xl border border-sky-100 bg-white/70 p-4 md:p-6">
        {/* 記事一覧 */}
        <ArticleHeader baseDir="articles" filePath="/2026/02/website-renewal.md" href="/article/" />
        <ArticleHeader baseDir="articles" filePath="/2026/03/iyasaka.md" href="/article/" />
        <ArticleHeader baseDir="articles" filePath="/2026/03/wheelchair-soccer.md" href="/article/" />
        <ArticleHeader baseDir="articles" filePath="/2026/02/para-sports-forum.md" href="/article/" />
      </div>
    </section>
  );
};

export default Information;
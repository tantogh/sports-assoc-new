// /src/component/top/information/information.tsx

import Title from "@/component/common/title/title";
import ArticleHeader from "@/component/common/article/articleHeader";

const Information = () => {
  return (
      <section className="mx-auto w-full max-w-7xl rounded-2xl border border-sky-100 bg-sky-100/80 px-6 py-10 shadow-sm md:px-10">
        <div className="mb-6">
          <Title
            title="新着情報"
          />
        </div>

        <div className="rounded-xl border border-sky-100 bg-white/70 p-4 md:p-6">
          {/* 記事一覧 */}
          <ArticleHeader baseDir="articles" filePath="/2026/02/website-renewal.md" href="#" />
          <ArticleHeader baseDir="articles" filePath="/2026/03/iyasaka.md" href="#" />
          <ArticleHeader baseDir="articles" filePath="/2026/03/wheelchair-soccer.md" href="#" />
          <ArticleHeader baseDir="articles" filePath="/2026/02/para-sports-forum.md" href="#" />
        </div>
      </section>
  );
};

export default Information;
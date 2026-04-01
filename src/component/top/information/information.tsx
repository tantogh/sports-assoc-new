// /src/component/top/information/information.tsx

import ArticleHeader from "@/component/common/article/articleHeader";

const Information = () => {
  return (
      <>
        <div className="text-lg font-bold">新着情報</div>
        <ArticleHeader baseDir="articles" filePath="/2026/02/website-renewal.md" href="#" />
        <ArticleHeader baseDir="articles" filePath="/2026/03/iyasaka.md" href="#" />
        <ArticleHeader baseDir="articles" filePath="/2026/03/wheelchair-soccer.md" href="#" />
        <ArticleHeader baseDir="articles" filePath="/2026/02/para-sports-forum.md" href="#" />
      </>
  );
};

export default Information;
// /src/app/article/page.tsx

import Header from "@/component/common/header/header";
import Article from "@/component/common/article/article";
import Title from "@/component/common/title/title";

const ArticlePage = () => {
  return (
    <>
      <Header />
      <Title title="新着情報" />
      <Article filename="articles/2026/01/2026-01-01.md" />
    </>
    );
};

export default ArticlePage;
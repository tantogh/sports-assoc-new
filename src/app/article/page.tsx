// /src/app/article/page.tsx

import Header from "@/component/common/header/header";
import Article from "@/component/common/article/article";

const ArticlePage = () => {
  return (
    <>
      <Header />
      <Article filename="articles/2026/03/iyasaka.md" />
    </>
    );
};

export default ArticlePage;
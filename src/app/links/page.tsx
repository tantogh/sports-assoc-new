// src/app/links/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "リンク集|石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会のリンク集のページです。",
}

const LinksPage = () => {
  return (
    <>
      <Title title="リンク集" />
    </>
  );
};

export default LinksPage;
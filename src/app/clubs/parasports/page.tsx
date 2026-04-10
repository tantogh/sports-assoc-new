// src/app/clubs/introduction/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "パラスポーツの紹介|クラブ情報|石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会のパラスポーツの紹介のページです。",
}

const ParaSports = () => {
  return (
    <>
      <Title subTitle="PARASPORTS" title="パラスポーツの紹介" />
    </>
  );
};

export default ParaSports;
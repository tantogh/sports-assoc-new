// src/app/clubs/introduction/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "パラスポーツの紹介 | クラブ情報 | 石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会のパラスポーツの紹介のページです。",
}

export default function ParaSports() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-2 mb-8 lg:px-4">
        <Title subTitle="PARASPORTS" title="パラスポーツの紹介" />
      </div>
    </>
  );
};

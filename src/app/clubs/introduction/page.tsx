// src/app/clubs/introduction/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "クラブ紹介 | クラブ情報 | 石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会のクラブ紹介のページです。",
}

export default function Introduction() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-2 lg:px-4">
        <Title subTitle="CLUBS" title="クラブ紹介" />
      </div>
    </>
  );
};

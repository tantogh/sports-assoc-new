// src/app/clubs/introduction/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "過去記事 | 石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会の過去記事のページです。",
}

export default function Archives() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-2 mb-8 lg:px-4">
        <Title subTitle="ARCHIVES" title="過去記事" />
      </div>
    </>
  );
};

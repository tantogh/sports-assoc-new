// src/app/tournaments/ishikawa/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "石川県障害者スポーツ大会 | スポーツ大会|石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会の石川県障害者スポーツ大会のページです。",
}

export default function IshikawaPage() {
  return (
    <>
      <Title subTitle="TOURNAMENTS" title="石川県障害者スポーツ大会" />
    </>
  );
};

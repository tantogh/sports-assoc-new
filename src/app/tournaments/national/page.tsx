// src/app/tournaments/national/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "全国障害者スポーツ大会|スポーツ大会|石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会の全国障害者スポーツ大会のページです。",
}

export default function NationalPage() {
  return (
    <>
      <Title subTitle="TOURNAMENTS" title="全国障害者スポーツ大会" />
    </>
  );
};

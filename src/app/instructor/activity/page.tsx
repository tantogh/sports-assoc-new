// src/app/instructor/reports/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "指導員活動報告 | 指導員情報 | 石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会のパラスポーツ指導員活動報告のページです。",
}

export default function ActivityPage() {
  return (
    <>
      <Title subTitle="ACTIVITY" title="パラスポーツ指導員活動報告" />
    </>
  );
};

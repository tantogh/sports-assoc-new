// src/app/events/staff/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "ボランティア・スタッフ募集について | 大会・イベント|石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会のボランティア・スタッフ募集についてのページです。",
}

export default function StaffPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-2 mb-8 lg:px-4">
        <Title subTitle="STAFF" title="ボランティア・スタッフ募集について" />
      </div>
    </>
  );
};

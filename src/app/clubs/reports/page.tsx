// src/app/clubs/reports/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "クラブ報告|クラブ情報|石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会のクラブ報告のページです。",
}

const Reports = () => {
  return (
    <>
      <Title subTitle="REPORTS" title="クラブ報告" />
    </>
  );
};

export default Reports;
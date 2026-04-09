// src/app/events/reports/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "事業報告|大会・イベント|石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会の大会事業報告のページです。",
}

const ResultsPage = () => {
  return (
    <>
      <Title title="事業報告" />
    </>
  );
};

export default ResultsPage;
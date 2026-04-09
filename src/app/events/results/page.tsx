// src/app/events/results/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "大会結果|大会・イベント|石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会の大会結果のページです。",
}

const ResultsPage = () => {
  return (
    <>
      <Title title="大会結果" />
    </>
  );
};

export default ResultsPage;
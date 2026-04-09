// src/app/downloads/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "様式のダウンロード|石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会の様式のダウンロードのページです。",
}

const DownloadsPage = () => {
  return (
    <>
      <Title title="様式のダウンロード" />
    </>
  );
};

export default DownloadsPage;
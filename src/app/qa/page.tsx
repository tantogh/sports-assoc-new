// src/app/qa/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "Q&A|石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会のQ&Aのページです。",
}

export default function QandAPage() {
  return (
    <>
      <Title subTitle="Q&A" title="パラスポーツQ&A" />
    </>
  );
};

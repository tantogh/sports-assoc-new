// src/app/about/newsletter/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "協会だより|協会概要|石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会の協会だよりのページです。",
}

const Newsletter = () => {
  return (
    <>
      <Title title="協会だより" />
    </>
  );
};

export default Newsletter;
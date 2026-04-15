// src/app/about/assoc/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "協会について|協会概要|石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会についてのページです。",
}

export default function Assoc() {
  return (
    <>
      <Title subTitle="ABOUT" title="協会について" />
    </>
  );
};
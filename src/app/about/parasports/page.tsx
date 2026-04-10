// src/app/about/parasports/page.tsx
import { Metadata } from "next";

import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "パラスポーツとは|協会概要|石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会のパラスポーツについてのページです。",
}

const Parasports = () => {
  return (
    <>
      <Title subTitle="PARASPORTS" title="パラスポーツとは" />
    </>
  );
};

export default Parasports;
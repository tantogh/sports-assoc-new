// src/app/rental/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "用具貸し出し | 石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会の用具貸し出しのページです。",
}

export default function RentalPage() {
  return (
    <>
      <Title subTitle="RENTAL" title="スポーツ用具貸し出し" />
    </>
  );
};

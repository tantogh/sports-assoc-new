// src/app/instructor/recruitment/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "パラスポーツ指導員募集|指導員|石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会の指導員募集のページです。",
}

export default function RecruitmentPage() {
  return (
    <>
      <Title subTitle="RECRUITMENT" title="パラスポーツ指導員募集" />
    </>
  );
};

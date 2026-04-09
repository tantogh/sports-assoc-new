// src/app/instructor/seminars/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "指導員養成講習会|指導員情報|石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会のパラスポーツ指導員養成講習会のページです。",
}

const SeminarsPage = () => {
  return (
    <>
      <Title title="パラスポーツ指導員養成講習会" />
    </>
  );
};

export default SeminarsPage;
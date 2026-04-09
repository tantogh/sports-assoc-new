// src/app/contact/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "お問い合わせ|石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会のお問い合わせのページです。",
}

const ContactPage = () => {
  return (
    <>
      <Title title="お問い合わせ" />
    </>
  );
};

export default ContactPage;
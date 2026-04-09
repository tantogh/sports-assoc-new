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
      <form action="confirm.php" method="POST">
        <div className="p-4">
          <label htmlFor="name">お名前：</label><br />
          <input type="text" id="name" name="name" required className="border" />
        </div>
        <div className="p-4">
          <label htmlFor="email">メールアドレス：</label><br />
          <input type="email" id="email" name="email" required className="border" />
        </div>
        <div className="p-4">
          <label htmlFor="message">お問い合わせ内容：</label><br />
          <textarea id="message" name="message" required className="border p-16"></textarea>
        </div>
        <button type="submit" className="border p-2 m-4 bg-gray-300 rounded-lg">確認画面へ</button>
      </form>
    </>
  );
};

export default ContactPage;
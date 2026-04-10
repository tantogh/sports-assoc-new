// src/app/contact/page.tsx

import { Metadata } from "next";

import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "お問い合わせ|石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会へのお問い合わせフォームです。",
};

const ContactPage = () => {
  return (
    <main className="bg-slate-50 text-slate-800">
      <section className="mx-auto max-w-5xl px-6 md:px-8">
        <div className="mb-10 text-center md:mb-14">
          <Title subTitle="CONTACT" title="お問い合わせフォーム" />
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
            ご質問やご相談、ご意見などがございましたら、以下のフォームよりお問い合わせください。
            内容を確認のうえ、担当者よりご連絡いたします。
          </p>
        </div>
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-10">
          <form className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  お名前
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="山田 太郎"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              </div>
              <div>
                <label
                  htmlFor="furigana"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  ふりがな
                </label>
                <input
                  id="furigana"
                  name="furigana"
                  type="text"
                  placeholder="やまだ たろう"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  メールアドレス
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@example.com"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  電話番号
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="090-1234-5678"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                件名
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="お問い合わせの件名をご入力ください"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                お問い合わせ内容
              </label>
              <textarea
                id="message"
                name="message"
                rows={8}
                placeholder="お問い合わせ内容をご入力ください"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              />
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <label className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                <input
                  type="checkbox"
                  name="privacy"
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                />
                <span>
                  個人情報の取り扱いに同意のうえ送信します。
                </span>
              </label>
            </div>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200"
              >
                送信する
              </button>
              <button
                type="reset"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-slate-200"
              >
                入力内容をリセット
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;

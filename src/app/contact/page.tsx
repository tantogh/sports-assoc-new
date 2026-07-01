// src/app/contact/page.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';

import Title from "@/component/common/title/title";

// ==========================================
// 1. 型の定義
// ==========================================
interface FormDataState {
  name: string;
  furigana: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  // ==========================================
  // 2. Stateの初期化
  // ==========================================
  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    furigana: '',
    email: '',
    message: '',
  });

  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);
  const [agreedToPrivacyPolicy, setAgreedToPrivacyPolicy] = useState<boolean>(false);

  // ==========================================
  // 3. イベントハンドラー
  // ==========================================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConfirm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsConfirming(true);
  };

  const handleSubmit = async () => {
    const sendData = new FormData();
    sendData.append('name', formData.name);
    sendData.append('furigana', formData.furigana);
    sendData.append('email', formData.email);
    sendData.append('message', formData.message);

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/php/mail.php`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: sendData,
      });

      if (response.ok) {
        setIsSent(true);
      } else {
        alert('送信に失敗しました。');
      }
    } catch (error) {
      alert('通信エラーが発生しました。');
    }
  };

  // ==========================================
  // 4. UIのレンダリング
  // ==========================================

  // 送信完了画面
  if (isSent) {
    return (
      <>
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center border border-gray-100">
          <h2 className="text-2xl font-bold text-green-600 mb-4">送信完了</h2>
          <p className="text-gray-700">お問い合わせありがとうございます。</p>
        </div>
      </>
    );
  }

  // 確認画面
  if (isConfirming) {
    return (
      <>
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h2 className="mb-4 border-b pb-2 pl-2 text-2xl font-semibold border-l-8 border-sky-600">入力内容の確認</h2>
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">お名前</p>
              <p className="font-medium">{formData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">ふりがな</p>
              <p className="font-medium">{formData.furigana}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">メールアドレス</p>
              <p className="font-medium">{formData.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">お問い合わせ内容</p>
              <p className="font-medium whitespace-pre-wrap">{formData.message}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setIsConfirming(false)}
              className="w-1/2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
            >
              修正する
            </button>
            <button
              onClick={handleSubmit}
              className="w-1/2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-bold"
            >
              送信する
            </button>
          </div>
        </div>
      </>
    );
  }

  // 入力画面（初期表示）
  return (
    <>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-2 mb-8 lg:px-4">
          <Title subTitle="CONTACTS" title="お問い合わせ" />
        </div>
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h2 className="mb-4 border-b pb-2 pl-2 text-2xl font-semibold border-l-8 border-sky-600">お問い合わせフォーム</h2>
          <form onSubmit={handleConfirm} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">お名前</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="山田 太郎"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ふりがな</label>
              <input
                type="text"
                name="furigana"
                value={formData.furigana}
                onChange={handleChange}
                required
                placeholder="やまだ たろう"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="example@example.com"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">お問い合わせ内容</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="agreedToPrivacyPolicy"
                checked={agreedToPrivacyPolicy}
                onChange={(e) => setAgreedToPrivacyPolicy(e.target.checked)}
                required
                className="mt-1" />
              <label htmlFor="agreedToPrivacyPolicy" className="text-sm text-gray-700">
                <Link href="/privacy/" target="_blank" className="text-blue-800 hover:text-blue-900 hover:underline">個人情報保護方針</Link>に同意する
              </label>
            </div>
            <button
              type="submit"
              disabled={!agreedToPrivacyPolicy}
              className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition shadow-sm disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
            >
              確認画面へ
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

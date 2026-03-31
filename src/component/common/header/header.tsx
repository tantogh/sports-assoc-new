// src/component/common/header.tsx

"use client"; // 状態（useState）を使うため、App Routerの場合は必須です

import { useState } from "react";
import Link from "next/link"; // Next.jsのLinkコンポーネントを使用

import { notoSerifJP } from "@/component/utils/fonts/fonts";

type SubMenuKey = "association" | "club" | "sports" | "events" | "instructors";

export default function Header() {
  // メニューの開閉状態を管理するState（初期値はfalse＝閉じている）
  const [isOpen, setIsOpen] = useState(false);
  // サブメニューの開閉状態を管理するState
  const [openSubMenu, setOpenSubMenu] = useState<SubMenuKey | null>(null);

  const menuConfig = [
    { type: "link", label: "ホーム", href: "#" },
    {
      type: "submenu",
      key: "association" as SubMenuKey,
      label: "協会概要",
      items: [
        { label: "協会について", href: "#" },
        { label: "パラスポーツとは", href: "#" },
        { label: "協会だより", href: "#" },
      ],
    },
    {
      type: "submenu",
      key: "club" as SubMenuKey,
      label: "クラブ情報",
      items: [
        { label: "クラブ紹介", href: "#" },
        { label: "クラブ報告", href: "#" },
        { label: "パラスポーツ紹介", href: "#" },
      ],
    },
    {
      type: "submenu",
      key: "sports" as SubMenuKey,
      label: "スポーツ大会",
      items: [
        { label: "県内大会", href: "#" },
        { label: "全国大会", href: "#" },
      ],
    },
    {
      type: "submenu",
      key: "events" as SubMenuKey,
      label: "イベント",
      items: [
        { label: "大会結果", href: "#" },
        { label: "募集情報", href: "#" },
        { label: "事業報告", href: "#" },
      ],
    },
    {
      type: "submenu",
      key: "instructors" as SubMenuKey,
      label: "指導員",
      items: [
        { label: "講習会", href: "#" },
        { label: "募集情報", href: "#" },
        { label: "活動報告", href: "#" },
      ],
    },
    { type: "link", label: "用具", href: "#" },
    { type: "link", label: "Q＆A", href: "#" },
    { type: "link", label: "ダウンロード", href: "#" },
    { type: "link", label: "リンク集", href: "#" },
    { type: "link", label: "お問い合わせ", href: "#" },
  ] as const;

  // メニューの開閉を切り替える関数
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // サブメニューの開閉を切り替える関数
  const toggleSubMenu = (menu: SubMenuKey) => {
    setOpenSubMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <header className={`${notoSerifJP.variable} flex justify-between items-center p-4 bg-sky-700 text-white relative z-50 antialiased}`}>
      <div className="text-xl font-bold">石川県障害者スポーツ協会</div>

      {/* ==================================
          ハンバーガーボタン
          ================================== */}
      <button
        type="button"
        className="z-50 flex flex-col justify-between w-[30px] h-[20px] bg-transparent border-none cursor-pointer md:hidden"
        onClick={toggleMenu}
      >
        {/* 1本目の線 */}
        <span
          className={`w-full h-[3px] bg-white rounded-sm transition-all duration-300 ease-in-out ${isOpen ? "translate-y-[8.5px] rotate-45" : ""
            }`}
        />
        {/* 2本目の線 */}
        <span
          className={`w-full h-[3px] bg-white rounded-sm transition-all duration-300 ease-in-out ${isOpen ? "opacity-0" : ""
            }`}
        />
        {/* 3本目の線 */}
        <span
          className={`w-full h-[3px] bg-white rounded-sm transition-all duration-300 ease-in-out ${isOpen ? "-translate-y-[8.5px] -rotate-45" : ""
            }`}
        />
      </button>

      {/* ==================================
          ナビゲーションメニュー（スライドイン）
          ================================== */}
      <nav
        className={`fixed top-0 right-0 w-[250px] h-screen bg-sky-700 pt-20 transition-transform duration-300 ease-in-out z-40 
          md:static md:w-auto md:h-auto md:bg-transparent md:pt-0 md:translate-x-0
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <ul className="flex flex-col md:flex-row md:gap-6 px-6 md:px-0">
          {menuConfig.map((item) =>
            item.type === "link" ? (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block py-2 border-b border-gray-600 md:border-none md:py-2 hover:text-gray-300 transition-colors"
                  onClick={toggleMenu}
                >
                  {item.label}
                </Link>
              </li>
            ) : (
              <li key={item.key} className="relative">
                <button
                  onClick={() => toggleSubMenu(item.key)}
                  className="w-full text-left block py-2 border-b border-gray-600 md:border-none md:py-2 hover:text-gray-300 transition-colors flex justify-between items-center"
                >
                  {item.label}
                  <span
                    className={`transition-transform duration-600 ${openSubMenu === item.key ? "rotate-180" : ""}`}
                  >
                    ▼
                  </span>
                </button>
                <ul
                  className={`bg-sky-700 md:absolute md:top-full md:left-0 md:w-48 md:shadow-lg overflow-hidden transition-all duration-600 ease-in-out ${openSubMenu === item.key
                      ? "max-h-64 translate-y-0 pointer-events-auto"
                      : "max-h-0 -translate-y-2 pointer-events-none"
                    }`}
                >
                  {item.items.map((sub) => (
                    <li key={sub.label}>
                      <Link
                        href={sub.href}
                        className="block py-3 px-4 border-b border-gray-500 md:border-none hover:text-gray-300 transition-colors text-sm"
                        onClick={() => setOpenSubMenu(null)}
                      >
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ),
          )}
        </ul>
      </nav>
    </header>
  );
}
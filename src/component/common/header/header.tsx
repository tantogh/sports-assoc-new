// src/component/common/header.tsx

"use client"; // 状態（useState）を使うため、App Routerの場合は必須です

import { useState, useRef, useEffect } from "react";
import Link from "next/link"; // Next.jsのLinkコンポーネントを使用

import { notoSerifJP, geistMono } from "@/component/utils/fonts/fonts";
import Logo from "@/component/common/header/logo";
import menuConfig from "@/component/common/header/menu.json";

type LinkItem = { type: "link"; label: string; href: string; };
type SubmenuItem = { type: "submenu"; key: SubMenuKey; label: string; items: { label: string; href: string; }[]; };
type MenuItem = LinkItem | SubmenuItem;

const menuConfigTyped = menuConfig as MenuItem[];

type SubMenuKey = "association" | "club" | "sports" | "events" | "instructors";

export default function Header() {
  // メニューの開閉状態を管理するState（初期値はfalse＝閉じている）
  const [isOpen, setIsOpen] = useState(false);
  // サブメニューの開閉状態を管理するState
  const [openSubMenu, setOpenSubMenu] = useState<SubMenuKey | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      // PC画面のみ反応（xl=1280px～、Tailwind基準）
      if (window.innerWidth >= 1280 && openSubMenu) {
        if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
          setOpenSubMenu(null);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openSubMenu]);

  // メニューの開閉を切り替える関数（同時に開いているサブメニューを閉じる）
  const toggleMenu = () => {
    setOpenSubMenu(null);
    setIsOpen(prev => !prev);
  };

  // サブメニューの開閉を切り替える関数
  const toggleSubMenu = (menu: SubMenuKey) => {
    setOpenSubMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <header ref={headerRef} className={`sticky top-0 flex justify-between items-center p-3 bg-sky-700 text-white relative z-50 antialiased ${notoSerifJP.className}`}>
      <Link
        href="/"
        className="flex items-center gap-2">
        <Logo />
        <div className="text-sm xl:text-lg font-bold">
          <span className="text-xs xl:text-sm">石川県</span><br />
          パラスポーツ協会
        </div>
      </Link>

      {/* ==================================
          ハンバーガーボタン
          ================================== */}
      <button
        type="button"
        className="z-50 flex flex-col justify-between w-[30px] h-[20px] bg-transparent border-none cursor-pointer xl:hidden"
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
          xl:static xl:w-auto xl:h-auto xl:bg-transparent xl:pt-0 xl:translate-x-0 text-xs md:text-sm
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <ul className="flex flex-col xl:flex-row xl:gap-6 px-6 xl:px-0">
          {menuConfigTyped.map((item) =>
            item.type === "link" ? (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block py-2 border-b border-gray-600 xl:border-none xl:py-2 hover:text-gray-300 transition-colors"
                  onClick={() => { toggleMenu(); setOpenSubMenu(null); }}
                >
                  {item.label}
                </Link>
              </li>
            ) : (
              <li key={item.key} className="relative">
                <button
                  onClick={() => toggleSubMenu(item.key)}
                  className="w-full text-left block py-2 border-b border-gray-600 xl:border-none xl:py-2 hover:text-gray-300 transition-colors flex justify-between items-center"
                >
                  {item.label}
                  <span
                    className={`text-xxs transition-transform duration-600 pl-[2px] ${openSubMenu === item.key ? "rotate-180" : ""}`}
                  >
                    ▼
                  </span>
                </button>
                <ul
                  className={`bg-sky-700 xl:absolute xl:top-full xl:left-0 xl:w-48 xl:shadow-xl overflow-hidden transition-all duration-600 ease-in-out ${openSubMenu === item.key
                      ? "max-h-64 translate-y-0 pointer-events-auto"
                      : "max-h-0 -translate-y-2 pointer-events-none"
                    }`}
                >
                  {item.items.map((sub) => (
                    <li key={sub.label}>
                      <Link
                        href={sub.href}
                        className="block py-3 px-4 border-b border-gray-500 xl:border-none hover:text-gray-300 transition-colors text-xs"
                        onClick={() => { setOpenSubMenu(null); setIsOpen(false); }}
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
};

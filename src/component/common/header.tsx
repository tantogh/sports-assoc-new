"use client"; // 状態（useState）を使うため、App Routerの場合は必須です

import { useState } from "react";
import Link from "next/link"; // Next.jsのLinkコンポーネントを使用

export default function Header() {
  // メニューの開閉状態を管理するState（初期値はfalse＝閉じている）
  const [isOpen, setIsOpen] = useState(false);

  // メニューの開閉を切り替える関数
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white relative z-50">
      {/* <div className="text-xl font-bold">MySite</div> */}

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
          className={`w-full h-[3px] bg-white rounded-sm transition-all duration-300 ease-in-out ${
            isOpen ? "translate-y-[8.5px] rotate-45" : ""
          }`}
        />
        {/* 2本目の線 */}
        <span
          className={`w-full h-[3px] bg-white rounded-sm transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        {/* 3本目の線 */}
        <span
          className={`w-full h-[3px] bg-white rounded-sm transition-all duration-300 ease-in-out ${
            isOpen ? "-translate-y-[8.5px] -rotate-45" : ""
          }`}
        />
      </button>

      {/* ==================================
          ナビゲーションメニュー（スライドイン）
          ================================== */}
      <nav
        className={`fixed top-0 right-0 w-[250px] h-screen bg-gray-700 pt-20 transition-transform duration-300 ease-in-out z-40 
          md:static md:w-auto md:h-auto md:bg-transparent md:pt-0 md:translate-x-0
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <ul className="flex flex-col md:flex-row md:gap-6 px-6 md:px-0">
          <li>
            <Link
              href="#"
              className="block py-4 border-b border-gray-600 md:border-none md:py-2 hover:text-gray-300 transition-colors"
              onClick={toggleMenu} // リンクを押したらメニューを閉じる
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block py-4 border-b border-gray-600 md:border-none md:py-2 hover:text-gray-300 transition-colors"
              onClick={toggleMenu}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block py-4 border-b border-gray-600 md:border-none md:py-2 hover:text-gray-300 transition-colors"
              onClick={toggleMenu}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block py-4 border-b border-gray-600 md:border-none md:py-2 hover:text-gray-300 transition-colors"
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
// src/component/common/header.tsx

"use client"; // 状態（useState）を使うため、App Routerの場合は必須です

import { useState } from "react";
import Link from "next/link"; // Next.jsのLinkコンポーネントを使用

export default function Header() {
  // メニューの開閉状態を管理するState（初期値はfalse＝閉じている）
  const [isOpen, setIsOpen] = useState(false);
  // サブメニューの開閉状態を管理するState
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  // メニューの開閉を切り替える関数
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // サブメニューの開閉を切り替える関数
  const toggleSubMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white relative z-50">
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
              トップ
            </Link>
          </li>
          <li className="relative">
            <button
              onClick={toggleSubMenu}
              className="w-full text-left block py-4 border-b border-gray-600 md:border-none md:py-2 hover:text-gray-300 transition-colors flex justify-between items-center"
            >
              協会概要
              <span className={`transition-transform duration-300 ${isSubMenuOpen ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            {/* サブメニューが展開時に表示 */}
            {isSubMenuOpen && (
              <ul className="bg-gray-600 md:absolute md:top-full md:left-0 md:w-48 md:shadow-lg">
                <li>
                  <Link
                    href="#"
                    className="block py-3 px-4 border-b border-gray-500 md:border-none hover:text-gray-300 transition-colors text-sm"
                    onClick={() => {
                      setIsSubMenuOpen(false);
                    }}
                  >
                    協会について
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block py-3 px-4 border-b border-gray-500 md:border-none hover:text-gray-300 transition-colors text-sm"
                    onClick={() => {
                      setIsSubMenuOpen(false);
                    }}
                  >
                    パラスポーツとは
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block py-3 px-4 hover:text-gray-300 transition-colors text-sm"
                    onClick={() => {
                      setIsSubMenuOpen(false);
                    }}
                  >
                    協会だより
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link
              href="#"
              className="block py-4 border-b border-gray-600 md:border-none md:py-2 hover:text-gray-300 transition-colors"
              onClick={toggleMenu}
            >
              クラブ情報
            </Link>
          </li>
           <li>
            <Link
              href="#"
              className="block py-4 border-b border-gray-600 md:border-none md:py-2 hover:text-gray-300 transition-colors"
              onClick={toggleMenu}
            >
              スポーツ大会
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block py-4 border-b border-gray-600 md:border-none md:py-2 hover:text-gray-300 transition-colors"
              onClick={toggleMenu}
            >
              イベント
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block py-4 border-b border-gray-600 md:border-none md:py-2 hover:text-gray-300 transition-colors"
              onClick={toggleMenu}
            >
              指導員
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block py-4 border-b border-gray-600 md:border-none md:py-2 hover:text-gray-300 transition-colors"
              onClick={toggleMenu}
            >
              用具
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block py-4 border-b border-gray-600 md:border-none md:py-2 hover:text-gray-300 transition-colors"
              onClick={toggleMenu}
            >
              Q＆A
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block py-4 border-b border-gray-600 md:border-none md:py-2 hover:text-gray-300 transition-colors"
              onClick={toggleMenu}
            >
              ダウンロード
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block py-4 border-b border-gray-600 md:border-none md:py-2 hover:text-gray-300 transition-colors"
              onClick={toggleMenu}
            >
              リンク集
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block py-4 border-b border-gray-600 md:border-none md:py-2 hover:text-gray-300 transition-colors"
              onClick={toggleMenu}
            >
              お問い合わせ
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
import type { Metadata } from "next";

import { notoSerifJP } from "@/component/utils/fonts/fonts";
import Header from "@/component/common/header/header";
import Footer from "@/component/common/footer/footer";

import "./globals.css";

export const metadata: Metadata = {
  title: "石川県障害者スポーツ協会",
  description: "石川県障害者スポーツ協会の情報を提供していきます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp" className="h-full antialiased scroll-smooth" data-theme="light">
      <body className={`${notoSerifJP.className} min-h-full flex flex-col`}>
        <Header />
        <main className="flex-grow bg-white">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

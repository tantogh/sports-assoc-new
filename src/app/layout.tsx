import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { notoSerifJP } from "@/component/utils/fonts/fonts";
import Header from "@/component/common/header/header";
import Footer from "@/component/common/footer/footer";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html
      lang="jp"
      className={`${notoSerifJP.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-grow bg-blue-50">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

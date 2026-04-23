// src/app/downloads/page.tsx
import { Metadata } from "next"

import { notoSerifJP } from "@/component/utils/fonts/fonts";
import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "ダウンロード | 石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会の後援申請や推薦状などのダウンロードのページです。",
}

export default function DownloadsPage() {
  return (
    <>
      <Title subTitle="DOWNLOADS" title="ダウンロード" />
      <section className={`max-w-2xl mx-auto p-6 bg-white ${notoSerifJP.className}`}>
        <ul className="space-y-3">
          <li className="flex justify-between rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50">
            <span>後援申請・報告書</span>
            <a
              href="/downloads/downloads/kouensinseihoukoku2020.doc"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 underline hover:text-blue-800"
            >
              ダウンロード
            </a>
          </li>
          <li className="flex justify-between rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50">
            <span>推薦書</span>
            <a
              href="/downloads/downloads/suisensyo.xls"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 underline hover:text-blue-800"
            >
              ダウンロード
            </a>
          </li>
        </ul>
      </section>
    </>
  );
};

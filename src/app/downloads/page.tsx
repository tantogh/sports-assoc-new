// src/app/downloads/page.tsx
import { Metadata } from "next"

import { notoSerifJP } from "@/component/utils/fonts/fonts";
import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "ダウンロード|石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会の後援申請や推薦状などのダウンロードのページです。",
}

export default function DownloadsPage() {
  return (
    <>
      <Title subTitle="DOWNLOADS" title="ダウンロード" />
      <section className={`max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-100 ${notoSerifJP.className}`}>
        <table className="w-full border border-gray-400 bg-white text-xs md:text-base">
          <tbody>
            <tr>
              <td className="p-4 border border-gray-400">後援申請・報告書</td>
              <td className="p-4 border border-gray-400">
                <a
                  href="/downloads/downloads/kouensinseihoukoku2020.doc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-600 underline"
                >
                  ダウンロード
                </a>
              </td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-400">推薦書</td>
              <td className="p-4 border border-gray-400">
                <a
                  href="/downloads/downloads/suisensyo.xls"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-600 underline"
                >
                  ダウンロード
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
};

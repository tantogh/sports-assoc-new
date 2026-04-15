// src/app/downloads/page.tsx
import { Metadata } from "next"

import { notoSerifJP } from "@/component/utils/fonts/fonts";
import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "様式のダウンロード|石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会の様式のダウンロードのページです。",
}

export default function DownloadsPage() {
  return (
    <main className="min-h-screen bg-blue-50">
      <div className={`max-w-7xl mx-auto px-4 py-12 ${notoSerifJP.className}`}>
        <section className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
          <Title subTitle="DOWNLOADS" title="ダウンロード" />
          <table className="w-full border border-gray-400 bg-white text-xs md:text-base">
            <tbody>
              <tr>
                <td className="p-4 border border-gray-400">後援申請・報告書</td>
                <td className="p-4 border border-gray-400">
                  <a
                    href="/downloads/downloads/kouensinseihoukoku2020.doc"
                    target="_blank"
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
                    className="font-bold text-blue-600 underline"
                  >
                    ダウンロード
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
};

// src/app/downloads/page.tsx
import { Metadata } from "next"
import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "申請書類 | 石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会の後援申請や推薦状などの申請書類のページです。",
}

export default function DownloadsPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-2 lg:px-4">
        <Title subTitle="APPLICATION FORMS" title="申請書類" />
        <section className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg">
          <p className="mb-6 leading-relaxed text-gray-700">
            後援申請書、表彰者推薦書などのダウンロードはこちらからお願いいたします。
          </p>
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b">
                <td className="py-4 px-3 text-gray-800">後援申請・報告書</td>
                <td className="py-4 px-3 text-right whitespace-nowrap">
                  <a
                    href="/downloads/downloads/kouensinseihoukoku2020.doc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-1 lg:text-base inline-block lg:px-4 py-2 rounded bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition whitespace-nowrap"
                  >
                    ダウンロード
                  </a>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-3 text-gray-800">推薦書</td>
                <td className="py-4 px-3 text-right whitespace-nowrap">
                  <a
                    href="/downloads/downloads/suisensyo.xls"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-1 lg:text-base inline-block lg:px-4 py-2 rounded bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition whitespace-nowrap"
                  >
                    ダウンロード
                  </a>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-3 text-gray-800">石川県障害者スポーツ協会用具使用申請書</td>
                <td className="py-4 px-3 text-right whitespace-nowrap">
                  <a
                    href="/downloads/downloads/yougu-shiyou-shinsei-2026.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-1 lg:text-base inline-block lg:px-4 py-2 rounded bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition whitespace-nowrap"
                  >
                    ダウンロード
                  </a>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-3 text-gray-800">石川県障害者スポーツ協会用具使用料金表</td>
                <td className="py-4 px-3 text-right whitespace-nowrap">
                  <a
                    href="/downloads/downloads/yougu-shiyou-ryoukin-2026.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-1 lg:text-base inline-block lg:px-4 py-2 rounded bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition whitespace-nowrap"
                  >
                    ダウンロード
                  </a>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-3 text-gray-800">指導員派遣依頼書</td>
                <td className="py-4 px-3 text-right whitespace-nowrap">
                  <a
                    href="/downloads/downloads/shidouin-haken-irai-2026.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-1 lg:text-base inline-block lg:px-4 py-2 rounded bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition whitespace-nowrap"
                  >
                    ダウンロード
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};

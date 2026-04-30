// src/app/rental/page.tsx
import { Metadata } from "next"
import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "用具貸し出し | 石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会の用具貸し出しのページです。",
}

export default function RentalPage() {
  return (
    <>
      <Title subTitle="RENTAL" title="スポーツ用具貸し出し" />
      <section className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg">
        <p className="mb-6 leading-relaxed text-gray-700">
          スポーツ用具貸し出しに関する書類はこちらからダウンロードしてください。
        </p>
        <table className="w-full border-collapse">
          <tbody>
            <tr className="border-b">
              <td className="py-4 px-3 text-gray-800">石川県障害者スポーツ協会用具使用申請書</td>
              <td className="py-4 px-3 text-right whitespace-nowrap">
                <a
                  href="/downloads/rental/yougu-shiyou-shinsei-2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs lg:text-base inline-block px-2 lg:px-4 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition whitespace-nowrap"
                >
                  ダウンロード
                </a>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-4 px-3 text-gray-800">石川県障害者スポーツ協会用具使用料金表</td>
              <td className="py-4 px-3 text-right whitespace-nowrap">
                <a
                  href="/downloads/rental/yougu-shiyou-ryoukin-2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs lg:text-base inline-block px-2 lg:px-4 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition whitespace-nowrap"
                >
                  ダウンロード
                </a>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-4 px-3 text-gray-800">指導員派遣依頼書</td>
              <td className="py-4 px-3 text-right whitespace-nowrap">
                <a
                  href="/downloads/rental/shidouin-haken-irai-2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs lg:text-base inline-block px-2 lg:px-4 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition whitespace-nowrap"
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
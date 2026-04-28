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
      <section className="max-w-2xl mx-auto p-6 bg-white">
        <p className="p-4">
          スポーツ用具貸し出しに関する書類はこちらからダウンロードしてください。
        </p>
        <table>
          <tbody>
            <tr>
              <td>
                石川県障害者スポーツ協会用具使用申請書
              </td>
              <td>
                <a href="#">
                  ダウンロード
                </a>
              </td>
            </tr>
            <tr>
              <td>
                石川県障害者スポーツ協会用具使用料金表
              </td>
              <td>
                <a href="#">
                  ダウンロード
                </a>
              </td>
            </tr>
            <tr>
              <td>
                指導員派遣依頼書
              </td>
              <td>
                <a href="#">
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

// src/app/privacy/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "個人情報の取扱について | 石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会のプライバシーポリシー（個人情報の取扱について）のページです。",
}

export default function PrivacyPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-2 mb-8 lg:px-4">
        <Title subTitle="PRIVACY POLICY" title="個人情報の取扱について" />
        <section className="max-w-2xl mx-auto p-6 bg-white">
          <p className="pb-8">
            石川県パラスポーツ協会（以下、「当団体」といいます。）は、個人情報の重要性を認識し、以下のとおりプライバシーポリシーを定め、個人情報の適切な保護に努めます。
          </p>

          <h2 className="mb-4 border-b pb-2 pl-2 text-xl font-semibold border-l-8 border-sky-600">
            個人情報の定義
          </h2>
          <p className="pb-8">
            個人情報とは、氏名、住所、電話番号、メールアドレスその他の記述等により、特定の個人を識別することができる情報を指します。
          </p>

          <h2 className="mb-4 border-b pb-2 pl-2 text-xl font-semibold border-l-8 border-sky-600">
            個人情報の取得方法
          </h2>
          <p className="pb-8">
            当団体は、お問い合わせフォームや電話・メール・書面によるご連絡、各種イベントへの参加申込みなど、適法かつ公正な手段により個人情報を取得します。
          </p>

          <h2 className="mb-4 border-b pb-2 pl-2 text-xl font-semibold border-l-8 border-sky-600">
            個人情報の収集・利用
          </h2>
          <p className="pb-8">
            当団体は、利用目的の達成に必要な範囲内で個人情報を収集し、ご本人にご了承いただいた範囲を超えて利用することはありません。
          </p>

          <h2 className="mb-4 border-b pb-2 pl-2 text-xl font-semibold border-l-8 border-sky-600">
            個人情報の利用目的
          </h2>
          <p className="pb-8">
            業務遂行上で必要となる当団体からのお問い合わせ対応
          </p>

          <h2 className="mb-4 border-b pb-2 pl-2 text-xl font-semibold border-l-8 border-sky-600">
            第三者への提供
          </h2>
          <p className="pb-8">
            司法機関・行政機関からの法的義務を伴う要請を受けた場合を除き、事前のご本人の同意なしに第三者へ個人情報を開示・提供することはありません。
          </p>

          <h2 className="mb-4 border-b pb-2 pl-2 text-xl font-semibold border-l-8 border-sky-600">
            安全管理
          </h2>
          <p className="pb-8">
            当団体は、個人情報の紛失、破壊、改ざん及び漏洩などを防止するため、必要かつ適切な安全管理措置を講じます。
          </p>

          <h2 className="mb-4 border-b pb-2 pl-2 text-xl font-semibold border-l-8 border-sky-600">
            開示・修正・削除について
          </h2>
          <p className="pb-8">
            当団体は、ご本人からご自身の個人情報について開示・修正・削除等のご請求があった場合には、ご本人であることを確認のうえ、速やかに対応いたします。お問い合わせは「お問い合わせ」ページよりご連絡ください。
          </p>

          <h2 className="mb-4 border-b pb-2 pl-2 text-xl font-semibold border-l-8 border-sky-600">
            プライバシーポリシーの変更
          </h2>
          <p className="pb-8">
            当団体は、法令の変更や社会情勢の変化等に応じて、本ポリシーの内容を予告なく変更することがあります。変更後のプライバシーポリシーは、当ウェブサイトに掲載した時点から効力を生じるものとします。
          </p>

          <h2 className="mb-4 border-b pb-2 pl-2 text-xl font-semibold border-l-8 border-sky-600">
            制定日
          </h2>
          <p>
            2026年7月1日 制定
          </p>
        </section>
      </div>
    </>
  );
};

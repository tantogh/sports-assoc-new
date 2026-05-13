// src/app/about/assoc/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";
import { notoSerifJP } from "@/component/utils/fonts/fonts";

export const metadata: Metadata = {
  title: "協会について | 協会概要 | 石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会についてのページです。",
}

export default function Assoc() {
  return (
    <>
      <Title subTitle="ABOUT" title="石川県パラスポーツ協会について" />
      <section className={`max-w-2xl mx-auto p-6 bg-white ${notoSerifJP.className}`}>
        <h2 className="mb-4 border-b pb-2 pl-2 text-xl font-semibold border-l-8 border-sky-600">
          協会について
        </h2>
        <p>

        </p>
        <h2 className="mb-4 border-b pb-2 pl-2 text-xl font-semibold border-l-8 border-sky-600">
          アクセス
        </h2>
        <div className="flex flex-col lg:flex-row">
          <div className="p-4 lg:w-1/2 w-full">
            <h3 className="text-lg font-bold pb-4">石川県パラスポーツ協会</h3>
            <p className="pb-2">
              〒920-0355<br />
              石川県金沢市稚日野町北222番地<br />
              いしかわ総合スポーツセンター内<br />
            </p>
            <p className="pb-2">
              TEL: 076-213-6288<br />
              FAX: 076-213-6287<br />
              E-MAIL: <a href="mailto:i-sho-spo@po4.nsk.ne.jp" className="text-blue-600 hover:text-blue-800 hover:underline">i-sho-spo@po4.nsk.ne.jp</a>
            </p>
          </div>
          <div className="p-4 lg:w-1/2 w-full">
              <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d8978.548559739984!2d136.59347593569413!3d36.579670413385934!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5ff9cb4e3cc05227%3A0x1a5a93cff33aa491!2z44GE44GX44GL44KP57eP5ZCI44K544Od44O844OE44K744Oz44K_44O8!5e0!3m2!1sja!2sus!4v1778652636627!5m2!1sja!2sus"
              width="100%" height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};
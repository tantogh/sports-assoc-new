// src/app/about/assoc/page.tsx
import { Metadata } from "next"

import Title from "@/component/common/title/title";

export const metadata: Metadata = {
  title: "協会について | 協会概要 | 石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会についてのページです。",
}

export default function Assoc() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-2 mb-8 lg:px-4">
        <Title subTitle="ABOUT" title="石川県パラスポーツ協会について" />
        <section className="max-w-2xl mx-auto p-6 bg-white text-center">
          <h2 className="mb-1 text-xl font-semibold">
            協会について
          </h2>
          <div className="mx-auto mb-4 w-8 border-b-6 border-sky-600"></div>
          <p className="pb-4">
            石川県パラスポーツ協会は、<br />
            石川県内のパラスポーツの普及と発展を目的とした団体です。<br />
            私たちは、障がいのある方々がスポーツを通じて自己実現し、<br />
            社会参加を促進することを目指しています。
          </p>

          <h2 className="mt-8 mb-1 text-xl font-semibold">
            アクセス
          </h2>
          <div className="mx-auto mb-4 w-8 border-b-6 border-sky-600"></div>
          <div className="flex flex-col items-center">
            <div className="w-full mb-4">
              <h3 className="text-base font-bold pb-4">石川県パラスポーツ協会</h3>
              <p className="pb-2">
                〒920-0355<br />
                石川県金沢市<ruby>稚日野町<rt>わかひのまち</rt></ruby>北222番地<br />
                いしかわ総合スポーツセンター内<br />
              </p>
              <p className="pb-2">
                TEL: 076-213-6288<br />
                FAX: 076-213-6287<br />
                E-MAIL: <a href="mailto:i-sho-spo@po4.nsk.ne.jp" className="text-blue-600 hover:text-blue-800 hover:underline">i-sho-spo@po4.nsk.ne.jp</a>
              </p>
            </div>
            <div className="w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d8978.548559739984!2d136.59347593569413!3d36.579670413385934!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5ff9cb4e3cc05227%3A0x1a5a93cff33aa491!2z44GE44GX44GL44KP57eP5ZCI44K544Od44O844OE44K744Oz44K_44O8!5e0!3m2!1sja!2sus!4v1778652636627!5m2!1sja!2sus"
                width="100%" height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              ></iframe>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
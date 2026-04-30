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
      <Title subTitle="ABOUT" title="石川県パラスポーツ協会について" />
      <h2>
        アクセス
      </h2>
      <div>
        <p className="">
          〒920-0355<br />
          石川県金沢市稚日野町北222番地 &nbsp; いしかわ総合スポーツセンター内<br />
          TEL: 076-213-6288 &nbsp; FAX: 076-213-6287<br />
          E-MAIL: <a href="mailto:i-sho-spo@po4.nsk.ne.jp" className="text-blue-600 hover:text-blue-800 hover:underline">i-sho-spo@po4.nsk.ne.jp</a>
        </p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3203.9501671510434!2d136.59569907544181!3d36.57941868011458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5ff9cb4e3cc05227%3A0x1a5a93cff33aa491!2sIshikawa%20General%20Sports%20Center!5e0!3m2!1sen!2sjp!4v1777524138714!5m2!1sen!2sjp"
          width="600" height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </>
  );
};
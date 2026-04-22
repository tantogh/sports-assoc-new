// src/component/common/footer/footer.tsx

import Image from "next/image";
import Link from "next/link";

import { notoSerifJP } from "@/component/utils/fonts/fonts";
import Copyright from "@/component/common/footer/copyright";

export default function Footer() {
  return (
    <>
      {/* 全体の上下に余白(py-8)を追加して見やすくしています */}
      <div className={`bg-sky-100/80 text-xs xl:text-lg text-center py-8 ${notoSerifJP.className}`}>
        {/* ロゴを横並びにするFlexコンテナを追加 */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <Link
            href="#">
            <div className="w-8 h-8">
              <Image
                src="/images/icon/social/instagram_logo.png"
                alt="Instagramのロゴ"
                width={5000}
                height={5000}
                className="w-full h-full object-contain"
              />
            </div>
          </Link>
          <Link
            href="#">
            <div className="w-8 h-8">
              <Image
                src="/images/icon/social/facebook_logo.png"
                alt="Facebookのロゴ"
                width={2084}
                height={2084}
                className="w-full h-full object-contain"
              />
            </div>
          </Link>
          <Link
            href="#">
            <div className="w-8 h-8">
              <Image
                src="/images/icon/social/youtube_icon.png"
                alt="YouTubeのロゴ"
                width={838}
                height={592}
                className="w-full h-full object-contain"
              />
            </div>
          </Link>
        </div>

        <h2 className="text-sm xl:text-lg font-bold mb-2">
          石川県パラスポーツ協会
        </h2>
        <p className="text-xs leading-relaxed">
          〒920-0355<br />
          石川県金沢市稚日野町北222番地 &nbsp; いしかわ総合スポーツセンター内<br />
          TEL: 076-213-6288 &nbsp; FAX: 076-213-6287<br />
          E-MAIL: <a href="mailto:i-sho-spo@po4.nsk.ne.jp" className="text-blue-600 hover:text-blue-800 hover:underline">i-sho-spo@po4.nsk.ne.jp</a>
        </p>
      </div>

      <Copyright />
    </>
  );
};

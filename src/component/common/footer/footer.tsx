// /src/component/common/footer/footer.tsx

import Image from "next/image";
import Link from "next/link";

import { notoSerifJP } from "@/component/utils/fonts/fonts";

const Footer = () => {
  return (
    <>
      {/* 全体の上下に余白(py-8)を追加して見やすくしています */}
      <div className={`bg-sky-100/80 text-xs xl:text-lg text-center py-8 ${notoSerifJP.className}`}>
        <div className="flex flex-col items-center">
          {/* ロゴを横並びにするFlexコンテナを追加 */}
          <div className="flex justify-center items-center gap-6 mb-6">
            <Link
              href="#">
              <div className="w-16 h-16">
                <Image
                  src="images/icon/social/Instagram_Glyph_Gradient.png"
                  alt="Instagramのロゴ"
                  width={5000}
                  height={5000}
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
            <Link
              href="#">
              <div className="w-16 h-16">
                <Image
                  src="images/icon/social/Facebook_Logo_Primary.png"
                  alt="Facebookのロゴ"
                  width={2084}
                  height={2084}
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
            <Link
              href="#">
              <div className="w-26 h-26">
                <Image
                  src="images/icon/social/yt_icon_red_digital.png"
                  alt="YouTubeのロゴ"
                  width={1255}
                  height={1075}
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
          </div>

          <h2 className="text-sm xl:text-lg font-bold mb-2">
            石川県パラスポーツ協会
          </h2>
          <p className="leading-relaxed">
            〒920-0355<br />
            石川県金沢市稚日野町北222番 &nbsp; 石川県総合スポーツセンター内<br />
            TEL: 076-213-6288 &nbsp; FAX: 076-213-6287<br />
            E-MAIL: <a href="mailto:i-sho-spo@po4.nsk.ne.jp" className="text-blue-600 hover:text-blue-800 hover:underline">i-sho-spo@po4.nsk.ne.jp</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
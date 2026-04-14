// src/app/page.tsx
import { Metadata } from "next"

import Carousel, { CarouselImage } from "@/component/top/carousel/carousel";
import { getCarouselImages } from "@/component/top/carousel/getCarouselImages";
import Title from "@/component/common/title/title";
import Information from "@/component/top/information/information";
import Special from "@/component/top/special/information";
import Sponsorship from "@/component/top/sponsorship/sponsorship";

export const metadata: Metadata = {
  title: "ホーム|石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会のホームページです。石川県内外のパラスポーツの情報を発信しております。",
}

const Home = () => {
  const slideImages: CarouselImage[] = getCarouselImages();
  return (
    // bg-blue-50 で全体を薄い青色に、min-h-screen で画面全体をカバー
    <main className="min-h-screen bg-blue-50">
      {/* ヒーローセクションやカルーセル */}
      <div className="bg-white"> {/* カルーセル部分は白背景で際立たせる */}
        <Carousel images={slideImages} autoPlayInterval={5000} />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* 各コンポーネントをセクションとして配置 */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
          <Title subTitle="INFORMATION" title="新着情報" />
          <Information />
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
          <Title subTitle="SPECIAL" title="特別記事" />
          <Special />
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
          <Title subTitle="SPONSORSHIP" title="協賛企業" />
          <Sponsorship />
        </section>
      </div>
    </main>
  );
};

export default Home;
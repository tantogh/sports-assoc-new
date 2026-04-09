// src/app/page.tsx
import fs from "fs";
import path from "path";
import { Metadata } from "next"

import Carousel, { CarouselImage } from "@/component/top/carousel/carousel";
import UpdateDate from "@/component/top/date/updateDate";
import Title from "@/component/common/title/title";
import Information from "@/component/top/information/information";
import SpecialInfo from "@/component/top/special/information";
import Sponsorship from "@/component/top/sponsorship/sponsorship";

export const metadata: Metadata = {
  title: "ホーム|石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会のホームページです。石川県内外のパラスポーツの情報を発信しております。",
}

// public/images/carousel 以下の画像を取得する関数
const getCarouselImages = (): CarouselImage[] => {
  const dir = path.join(process.cwd(), "public", "images", "carousel");
  const files = fs.readdirSync(dir).filter((file) => /\.(png|jpe?g|svg)$/.test(file));
  return files.map((file) => ({
    src: `/images/carousel/${file}`,
    alt: file,
  }));
};

const Home = () => {
  // public/images/carousel 以下の画像ファイルを動的に取得
  const slideImages: CarouselImage[] = getCarouselImages();

  return (
    <>
      {/* カルーセルコンポーネント */}
      <Carousel images={slideImages} autoPlayInterval={5000} />
      {/* 更新日時コンポーネント */}
      <UpdateDate />
      {/* 新着情報コンポーネント */}
      <Title title={"新着情報"} />
      <Information />
      <hr className="border-t-1 border-gray-600 w-3/4 mx-auto" />
      {/* 特別情報コンポーネント */}
      <Title title={"特別記事"} />
      <SpecialInfo />
      <hr className="border-t-1 border-gray-600 w-3/4 mx-auto" />
      {/* 協賛企業コンポーネント */}
      <Title title={"協賛企業"} />
      <Sponsorship />
    </>
  );
}

export default Home;
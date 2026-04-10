// src/app/page.tsx
import { Metadata } from "next"

import Carousel, { CarouselImage } from "@/component/top/carousel/carousel";
import { getCarouselImages } from "@/component/top/carousel/getCarouselImages";
import UpdateDate from "@/component/top/date/updateDate";
import Title from "@/component/common/title/title";
import Information from "@/component/top/information/information";
import SpecialInfo from "@/component/top/special/information";
import Sponsorship from "@/component/top/sponsorship/sponsorship";

export const metadata: Metadata = {
  title: "ホーム|石川県パラスポーツ協会",
  description: "石川県パラスポーツ協会のホームページです。石川県内外のパラスポーツの情報を発信しております。",
}


const Home = () => {
  const slideImages: CarouselImage[] = getCarouselImages();

  return (
    <>
      {/* カルーセルコンポーネント */}
      <Carousel images={slideImages} autoPlayInterval={5000} />
      {/* 更新日時コンポーネント */}
      <UpdateDate />
      <hr className="border-t-1 border-gray-600 w-3/4 mx-auto" />
      {/* 新着情報コンポーネント */}
      <Title subTitle="INFORMATION" title="新着情報" />
      <Information />
      <hr className="border-t-1 border-gray-600 w-3/4 mx-auto" />
      {/* 特別情報コンポーネント */}
      <Title subTitle="SPECIAL"title="特別記事" />
      <SpecialInfo />
      <hr className="border-t-1 border-gray-600 w-3/4 mx-auto" />
      {/* 協賛企業コンポーネント */}
      <Title subTitle="SPONSORSHIP" title="協賛企業" />
      <Sponsorship />
    </>
  );
}

export default Home;
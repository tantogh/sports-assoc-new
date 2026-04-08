// src/app/page.tsx

import Carousel, { CarouselImage } from "@/component/top/carousel/carousel";
import Title from "@/component/common/title/title";
import Information from "@/component/top/information/information";
import SpecialInfo from "@/component/top/special/information";
import Sponsorship from "@/component/top/sponsorship/sponsorship";

const slideImages: CarouselImage[] = [
  { src: "/images/slides/slide1.jpg", alt: "スポーツ大会の様子" },
  { src: "/images/slides/slide2.jpg", alt: "選手たちの集合写真" },
  { src: "/images/slides/slide3.jpg", alt: "加賀スポーツ教室" },
];

const Home = () => {
  return (
    <>
      <Carousel images={slideImages} autoPlayInterval={5000} />
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
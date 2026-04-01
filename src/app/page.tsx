// src/app/page.tsx

import Header from "@/component/common/header/header";
import Carousel, { CarouselImage } from "@/component/top/carousel/carousel";

const slideImages: CarouselImage[] = [
  { src: "/images/slides/slide1.jpg", alt: "スポーツ大会の様子" },
  { src: "/images/slides/slide2.jpg", alt: "選手たちの集合写真" },
  { src: "/images/slides/slide3.jpg", alt: "加賀スポーツ教室" },
];

export default function Home() {
  return (
    <>
      {/* ヘッダーコンポーネント */}
      <Header />
      {/* カルーセルコンポーネント */}
      <Carousel images={slideImages} autoPlayInterval={5000} />
    </>
  );
}

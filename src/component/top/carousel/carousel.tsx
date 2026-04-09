// src/component/top/carousel/carousel.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// 表示する画像の型定義
export type CarouselImage = {
  src: string;
  alt: string;
};

interface CarouselProps {
  images: CarouselImage[];
  autoPlayInterval?: number; // 自動スライドの間隔（ミリ秒）。0にすると自動再生オフ
}

export const Carousel = ({ images, autoPlayInterval = 5000 }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 次のスライドへ
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  }, [images.length]);

  // 前のスライドへ
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // 特定のスライド（ドット用）へ
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // 自動再生の設定
  useEffect(() => {
    if (autoPlayInterval <= 0) return;
    const timer = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(timer); // クリーンアップ
  }, [autoPlayInterval, nextSlide]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden group">
      {/* 画像スライダー本体 */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0 relative aspect-[16/9] md:aspect-[21/9]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover object-top"
              priority={index === 0} // 最初の画像だけLCP最適化のために優先ロード
            />
          </div>
        ))}
      </div>

      {/* 左右のナビゲーションボタン */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50 focus:outline-none"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50 focus:outline-none"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* 下部のインジケーター（ドット） */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
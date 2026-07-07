// src/component/top/carousel/carousel.tsx

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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

export default function Carousel({ images, autoPlayInterval = 5000 }: CarouselProps) {
  // 先頭と末尾に複製スライドを追加し、末尾→先頭（またはその逆）でも
  // 常に同じ方向へスクロールしているように見せかける（無限ループ風の実装）
  const hasClones = images.length > 1;
  const offset = hasClones ? 1 : 0;
  const extendedImages = hasClones
    ? [images[images.length - 1], ...images, images[0]]
    : images;
  const [currentIndex, setCurrentIndex] = useState(offset);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const isWrappingRef = useRef(false);

  // 次のスライドへ
  const nextSlide = useCallback(() => {
    setIsTransitionEnabled(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }, []);

  // 前のスライドへ
  const prevSlide = () => {
    setIsTransitionEnabled(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  // 特定のスライド（ドット用）へ
  const goToSlide = (index: number) => {
    setIsTransitionEnabled(true);
    setCurrentIndex(index + offset);
  };

  // 複製スライドに到達したら、トランジション終了後に実スライドへ瞬時に戻す
  useEffect(() => {
    if (!hasClones) return;
    if (currentIndex === 0 || currentIndex === extendedImages.length - 1) {
      isWrappingRef.current = true;
    }
  }, [currentIndex, extendedImages.length, hasClones]);

  const handleTransitionEnd = () => {
    if (!isWrappingRef.current) return;
    isWrappingRef.current = false;
    if (currentIndex === extendedImages.length - 1) {
      setIsTransitionEnabled(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      setIsTransitionEnabled(false);
      setCurrentIndex(images.length);
    }
  };

  // トランジションを無効化した直後、次のレンダーで再度有効化する
  useEffect(() => {
    if (!isTransitionEnabled) {
      const frame = requestAnimationFrame(() => setIsTransitionEnabled(true));
      return () => cancelAnimationFrame(frame);
    }
  }, [isTransitionEnabled]);

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
        className={`flex ${isTransitionEnabled ? "transition-transform duration-500 ease-in-out" : ""}`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedImages.map((image, index) => (
          // スマホ縦画面では画像が横長のため、画面の高さいっぱいに伸ばすと object-cover で左右が大きく切れてしまう。
          // そのためスマホは元のアスペクト比のまま表示し（下に余白ができるのは許容）、
          // md以上ではヘッダーの実際の高さ（72px/80px、breakpointごとに異なる）を
          // 画面の高さから差し引き、ヘッダー直下で画面いっぱいに表示されるようにしている
          <div key={index} className="w-full flex-shrink-0 relative aspect-[16/9] md:aspect-auto md:h-[calc(100dvh-72px)] lg:h-[calc(100dvh-80px)]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover object-top"
              priority={index === offset} // 最初の画像だけLCP最適化のために優先ロード
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
              index === currentIndex - offset ? "bg-white" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

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
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

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

  // 複製スライドの境界（またはそれを通り越した位置）にいる場合、実スライド位置へ瞬時に戻す。
  // 通常はtransitionendイベント（handleTransitionEnd）から呼ばれるが、
  // タブが非表示の間に境界への遷移が完了した場合、一部のブラウザでは
  // 復帰してもtransitionendが発火しない。そのためタブ復帰時にも
  // このロジックを直接呼び出せるよう、currentIndexRefを介した
  // 独立した関数として切り出している。
  // また、非表示中に複数回nextSlideが積み重なると境界インデックスをちょうど
  // 通過するとは限らず「一致するかどうか」の判定では取りこぼすため、
  // 実スライド範囲の外にいるかどうかで判定し、mod演算で位置を正規化する。
  const syncBoundary = useCallback(() => {
    if (!hasClones) return;
    const index = currentIndexRef.current;
    if (index > 0 && index < extendedImages.length - 1) return; // 実スライド範囲内なら何もしない
    setIsTransitionEnabled(false);
    const realIndex = ((index - offset) % images.length + images.length) % images.length;
    setCurrentIndex(realIndex + offset);
  }, [hasClones, extendedImages.length, images.length, offset]);

  const handleTransitionEnd = () => {
    syncBoundary();
  };

  // トランジションを無効化した直後、次のレンダーで再度有効化する
  useEffect(() => {
    if (!isTransitionEnabled) {
      const frame = requestAnimationFrame(() => setIsTransitionEnabled(true));
      return () => cancelAnimationFrame(frame);
    }
  }, [isTransitionEnabled]);

  // 自動再生の設定
  // タブが非表示の間はCSSトランジションが進行しないため、setIntervalを止めずに
  // 回し続けるとcurrentIndexが境界チェック（handleTransitionEnd）を飛び越えて
  // extendedImagesの範囲外まで進んでしまい、復帰後にカルーセルが真っ白のまま
  // 固まる不具合につながる。そのためタブ非表示中はタイマー自体を止める。
  useEffect(() => {
    if (autoPlayInterval <= 0) return;
    let timer: ReturnType<typeof setInterval> | undefined;

    const start = () => {
      timer = setInterval(nextSlide, autoPlayInterval);
    };
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = undefined;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        // 非表示中に複製スライドへのラップ遷移が起きていた場合、
        // transitionendが発火せず補正されないまま固まっていることがある。
        // タイマー再開前に強制補正し、境界を超えてextendedImagesの
        // 範囲外まで進んでカルーセルが真っ白になるのを防ぐ。
        syncBoundary();
        start();
      }
    };

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [autoPlayInterval, nextSlide, syncBoundary]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden group">
      {/* 画像スライダー本体 */}
      <div
        className={`flex ${isTransitionEnabled ? "transition-transform duration-500 ease-in-out" : ""}`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedImages.map((image, index) => {
          // 初期表示スライド（index === offset）はLCP最適化のためeagerロードする。
          // 末尾の複製スライドは images[0] と同一URLで、こちらがlazyのままだと
          // next/imageの開発時LCP警告用マップ（src単位・後勝ち）をlazyで上書きし、
          // 「slide01.webp was detected as the Largest Contentful Paint」警告が出る。
          // 同一アセットなのでeagerにしても追加コストはない（ブラウザがリクエストを重複排除）。
          const isEager =
            index === offset || (hasClones && index === extendedImages.length - 1);
          return (
          // コンテナは画像の実アスペクト比（16:9）で組む。
          // 画面幅が広いと16:9の高さがビューポートを超え、スクロール
          // しないと画像全体が見えなくなるが、上下左右いずれも見切れ
          // させず画像全体を必ず表示することを優先する。
          <div
            key={index}
            className="w-full flex-shrink-0 relative aspect-[16/9]"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              loading={isEager ? "eager" : "lazy"} // Next.js 16では`priority`が非推奨のためloadingで制御
            />
          </div>
          );
        })}
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

import fs from "fs";
import path from "path";
import { CarouselImage } from "./carousel";

/**
 * public/images/carousel 以下の画像を取得する関数
 */
export const getCarouselImages = (): CarouselImage[] => {
  const dir = path.join(process.cwd(), "public", "images", "carousel");
  const files = fs
    .readdirSync(dir)
    .filter((file) => /\.(png|jpe?g|svg)$/.test(file));
  return files.map((file) => ({
    src: `/images/carousel/${file}`,
    alt: file,
  }));
};

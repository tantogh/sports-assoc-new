// src/utils/fonts/fonts.ts

import { Noto_Serif_JP, Geist, Geist_Mono } from 'next/font/google'
//import localFont from 'next/font/local'

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: 'variable',
  display: 'swap',
  variable: '--font-noto-serif-jp',
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: false
});

/*
const notoSerifJP = localFont({
  src: './NotoSerifJP-VariableFont_wght.ttf',
  display: 'swap',
  variable: '--font-noto-serif-jp',
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: false
});
*/

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  weight: 'variable',
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  weight: 'variable',
  subsets: ["latin"],
});

export { notoSerifJP, geistMono, geistSans };
import { Noto_Serif_JP } from 'next/font/google'
//import localFont from 'next/font/local'

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: 'variable',
  display: 'swap',
  variable: '--font-noto-serif-jp',
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: false
})

/*
const notoSerifJP = localFont({
  src: './NotoSerifJP-VariableFont_wght.ttf',
  display: 'swap',
  variable: '--font-noto-serif-jp',
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: false
})
*/

export { notoSerifJP }
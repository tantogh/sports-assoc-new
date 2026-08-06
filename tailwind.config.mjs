/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/component/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './**/*.html',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-geist-sans)', 'sans-serif'],
      serif: ['var(--font-noto-serif-jp)', 'serif'],
      mono: ['var(--font-geist-mono)', 'monospace'],
    },
    extend: {
      fontSize: {
        // extra-extra-small used across the site
        xxs: ['0.525rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [],
};

export default config;

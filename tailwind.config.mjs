/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/component/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './**/*.html',
  ],
  theme: {
    extend: {
      fontSize: {
        // extra-extra-small used across the site
        xxs: ['0.525rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [],
};

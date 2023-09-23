/** @type {import('tailwindcss').Config} */

const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      letterSpacing: {
        tightest: '-.075em',
        tighter: '-.05em',
        normal: '0',
        wider: '.05em',
        widest: '.25em',
      },
      fontFamily: {
        // antonio: ['Antonio', 'sans-serif'],
      },
      colors: {
        'light-gray': '#858585',
        'dark-gray': '#171717',
        'cool-white': '#F4F3F1',
      },
      backgroundImage: () => ({
        'gradient-to-black': 'linear-gradient(to bottom, transparent, black)',
      }),
      screens: {
        wide: '1440px',
      },
    },
  },
  plugins: [],
};
export default config;

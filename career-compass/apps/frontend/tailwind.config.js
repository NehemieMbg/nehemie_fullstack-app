/** @type {import('tailwindcss').Config} */

const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
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
        roboto: ['Roboto', 'sans-serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
      colors: {
        'cool-gray': '#F7F7F7',
        'light-gray': '#939393',
        'dark-gray': '#1E1E1E',
        'light-purple': '#8762DE',
        'neutral-purple': '#674BA9',
        'light-green': '#67F2A1',
        'dark-green': '#4EBB78',
      },
      backgroundImage: {
        'main-texture': "url('/images/wallpaper/dark-sand.jpg')",
      },
      screens: {
        wide: '1440px',
      },
    },
  },
  plugins: [],
};
export default config;

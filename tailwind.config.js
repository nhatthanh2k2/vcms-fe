/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'banner': "url('/images/banner.png')",
        'slide1': "url('/images/slide1.jpg')",
        'slide2': "url('/images/slide2.jpg')",
        'slide3': "url('/images/slide3.jpg')",
        'bg-vaccination': "url('/images/bg-vaccination.png')",
      },
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  plugins: [
    require('daisyui')
  ],
}


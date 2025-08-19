/** @type {import('tailwindcss').Config} */
export default {
  darkMode : 'class', // for tailwind knows dark mode and dark class
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
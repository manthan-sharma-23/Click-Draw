/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tinted: "#000000ef",
        tintwhite: "#F5F5F5"
      }
      , fontFamily: {
        roboto: "Roboto Mono, monospace"
      }
    },
  },
  plugins: [],
}
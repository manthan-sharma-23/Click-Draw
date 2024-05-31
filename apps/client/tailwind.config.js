/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tinted: "#0F1214",
        tintwhite: "#F5F5F5",
        tintdark:"#1D2126"
      }
      , fontFamily: {
        roboto: "Roboto Mono, monospace"
        , poppins: "Poppins, sans-serif"
      }
    },
  },
  plugins: [],
}
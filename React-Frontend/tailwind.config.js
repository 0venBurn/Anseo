/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "primary-dark": "#2D345D",
      "primary-text-dark": "#3B447A",
      "form-button-grey": "#E0E0E0",
      "shaded-grey": "#ABB0B4",
      white: "#FFFFFF",
      "bk-grey": "#F5F4FA",
      "yellow": "#DEDA6D",
      black: "#000000",
    },
    extend: {
      fontFamily: {
        alegreya: ["Alegreya", "serif"],
        commissioner: ["Commissioner", "sans-serif"],
        fredoka: ["Fredoka One", "cursive"],
      },
    },
  },
  plugins: [],
};

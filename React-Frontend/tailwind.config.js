/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "primary-dark": "#2D345D",
      "primary-text-dark": "#3B447A",
      "shaded-grey": "#ABB0B4",
      white: "#FFFFFF",
      "bk-grey": "#F5F4FA",
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

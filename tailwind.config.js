/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{hbs,html,md,liquid,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: '"Inter Variable", Inter, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      },
      backgroundImage: {
        // https://codepen.io/hzlo/pen/VweYrLX
        hazard: `repeating-linear-gradient(-45deg, #000, #000 20px, #c18600 20px, #c18600 40px)`,
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

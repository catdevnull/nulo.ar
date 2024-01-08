/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{hbs,html}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};

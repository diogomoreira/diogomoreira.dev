const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      }
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      neutral: colors.neutral,
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      "spring-wood": {
        50: "#f8f7f3",
        100: "#f0eee4",
        200: "#dfdac9",
        300: "#cbc2a6",
        400: "#b5a582",
        500: "#a5906a",
        600: "#98805e",
        700: "#7f694f",
        800: "#685644",
        900: "#554739",
        950: "#2d251d",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/aspect-ratio"), require("@tailwindcss/typography")],
};

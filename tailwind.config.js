/** @type {import('tailwindcss').Config} */
const {theme, variants} = require("./src/components/styles/tailwind.config");
const { colorThemes } = require("./src/components/styles/color-themes");
export default {
  mode: "jit",
  content: ["./src/**/*.{js,tsx,jsx}"],
  theme: theme,
  variants: variants,
  plugins: [require("./flexPlugin.js"), colorThemes],
};

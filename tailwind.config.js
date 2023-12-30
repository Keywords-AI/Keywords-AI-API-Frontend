/** @type {import('tailwindcss').Config} */
const theme = require("./src/components/styles/theme");
const { colorThemes } = require("./src/components/styles/color-themes");
export default {
  mode: "jit",
  content: ["./src/**/*.{js,tsx,jsx}"],
  theme: theme,
  plugins: [require("./flexPlugin.js"), colorThemes],
};

/** @type {import('tailwindcss').Config} */
const { join } = require("path");
const theme = require("./src/components/styles/theme");

export default {
  // content: [
  //   join(
  //     __dirname,
  //     "{src,pages,components,app}/**/*!(*.stories|*.spec).{js,jsx,html}"
  //   ),
  // ],
  content: ["./src/**/*.{js,tsx,jsx}"],
  theme: theme,
  variants: {
    extends: {
      opacity: ['peer-checked']
    }
  },
  plugins: [require("./flexPlugin.js")],
};

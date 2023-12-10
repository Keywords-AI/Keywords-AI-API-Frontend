const { createThemes } = require("tw-colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js,jsx}"],
  corePlugins: {
    preflight: false, //disable the base styles to start from scratch
  },
  theme: {
    extend: {
      spacing: {
        xxxs: "4px",
        xxs: "8px",
        xs: "12px",
        sm: "16px",
        md: "20px",
        lg: "32px",
        xl: "40px",
        xxl: "60px",
        xxxl: "80px",
        xxxxl: "120px",
      },
    },
  },
  plugins: [
    createThemes({
      light: {
        primary: "#003366",
        primary100: "#D1DDFC",
        primary500: "#33557D",
        white: "#F9FAFC",
        gray2: "#F2F4F7",
        gray3: "#9FA2AB",
        gray4: "#3E424A",
        black: "#181820",
        error: "#D43A28",
        "red-light": "#F7CAC9",
        "red-dark": "#D43A28",
        success: "#1E8449",
        "orange-light": "#FFF2E1",
        "orange-dark": "#F57C00",
        "purple-dark": "#8E24AA",
        "purple-light": "#F3E5F5",
        "teal-light": "#D0F0E4",
        "teal-dark": "#008080",
        "green-light": "#E8F5E9",
        "green-dark": "#1E8449",
      },
    }),
  ],
};

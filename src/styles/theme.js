const gray3 = "#3E424A";
const gray4 = "#B1B3BC";

export default {
  extend: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      "fira-code": ["Fira Code"],
    },
    spacing: {
      xxxs: "4px",
      xxs: "8px",
      xs: "12px",
      sm: "16px",
      md: "20px",
      lg: "32px",
      xl: "60px",
      xxl: "80px",
      xxxl: "120px",
    },
    padding: {
      xxxs: "4px",
      xxs: "8px",
      xs: "12px",
      sm: "16px",
      md: "20px",
      lg: "32px",
      xl: "60px",
      xxl: "80px",
      xxxl: "120px",
    },
    borderRadius: {
      xs: "0px",
      sm: "4px",
      md: "8px",
      lg: "18px",
      xl: "24px",
    },
    colors: {
      primary: "#6188ED",
      complementary: "#123456",
      success: "#73CB98",
      error: "#F55656",
      avatar: "#008080", //to be updated, ping @andy
      gray: {
        white: "#F9FAFC",
        black: "#05050A",
        2: "#151518",
        3: gray3,
        4: gray4,
      },
      box: "#1D1D1D",
      resend: {
        64: "rgba(239, 245, 255, 0.69)",
      },
    },
    boxShadow: {
      pricing: "2px 2px 10px 2px rgba(24, 24, 32, 0.40)",
      purple: "0 0 40px rgba(143, 0, 210, 0.25)", // Jialin's work, but if something went wrong, ping @Hendrix
      window: `0 0 10px 10px rgba(255, 255, 255, 0.05), 0 0 0 1px ${gray3}`,
      key: `1px 1px 1px 0px black`,
      border: `inset 0 0 0 1px ${gray3}`,
      'border-l': `inset 1px 0 0 0 ${gray3}`,
      'border-b': `inset 0 -1px 0 0 ${gray3}`,
      'border-t': `inset 0 1px 0 0 ${gray3}`,
      'border-r': `inset -1px 0 0 0 ${gray3}`,
    },
    backgroundImage: {
      highlight:
        "linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, rgba(0, 0, 0, 0.20) 0%, rgba(143, 143, 143, 0.67) 50%, rgba(0, 0, 0, 0.04) 100%)",
    },
    screens: {
      sm: { max: "680px" },
    },
  },
};
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./styles/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBlack: "#0e1111",
        primaryDarkGrey: "#1e1e1e",
        primaryOrange: "#ec6001",
        primaryLightGrey: "#969393",
        secondaryGrey: "#333",
        overLayDark: "#000000BF",
        overLayLightDark: "#00000080",
        overLayDarker: "#000000F2",
        error: "#CC0000",
        success: "#008000",
        facebook: "#1877F2",
        twitter: "#1DA1F2",
        instagram: "#E4405F",
      },
      fontSize: {
        header: "40px",
        headingLg: "32px",
        headingMd: "24px",
        headingSm: "20px",
        headingSx: "18px",
        textMd: "16px",
        textSm: "14px",
        textXs: "12px",
      },
      fontFamily: {
        headerFont: ["Monoton", "sans-serif"],
        primaryFont: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [],
};

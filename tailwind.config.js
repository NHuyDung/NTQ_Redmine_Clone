/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // color Mainstream
        primary: {
          DEFAULT: "#628db7",
          light: "#507AAA",
          dark: "#3d5b75",
          blue: "#116699",
          text: "#505050",
          border: "#dcdcdc",
          sub_bg: "#eeeeee",
          bgError: "#ffe3e3",
          bgLogin: "#ffebc1",
          borderLogin: "#fdbf3b",
          borderError: "#ee7878",
        },
      },
      borderWidth: {
        1: "1px",
        3: "3px",
        5: "5px",
      },
      minWidth: {
        900: "900px",
        463: "463px",
      },
      minHeight: {
        615: "615px",
      },
      height: {
        88: "88px",
      },
      fontSize: {
        10: ["10px", { lineHeight: "14px" }],
        11: ["11px", { lineHeight: "15px" }],
        13: ["13px", { lineHeight: "18px" }],
      },
    },
  },
  plugins: [],
};

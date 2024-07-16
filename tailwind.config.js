/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // color Mainstream
        primary: {
          DEFAULT: "#628db7",
          dark: "#3d5b75",
          light: "#507AAA",
          border: "#bbb",
          sub_bg: "#eeeeee",
          borderLogin: "#fdbf3b",
          bgLogin: "#ffebc1",
          bgError: "#ffe3e3",
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
      },
      minHeight: {
        615: "615px",
      },
      height: {
        88: "88px",
      },
      fontSize: {
        10: ["10px", { lineHeight: "14px" }],
      },
    },
  },
  plugins: [],
};

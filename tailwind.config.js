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
          border: "#bbb",
          sub_bg: "#eeeeee",
          borderLogin:"#fdbf3b",
          bgLogin:"#ffebc1"
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
      height: {
        88: "88px",
      },
    },
  },
  plugins: [],
};

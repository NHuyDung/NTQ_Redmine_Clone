/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#628db7",
          dark: "#3d5b75",
        },
      },
    },
  },
  plugins: [],
};

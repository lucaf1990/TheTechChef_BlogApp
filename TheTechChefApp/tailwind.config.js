/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./main/**.{js,ts,jsx,tsx}",
    "./chefs/**.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pop: ["Poppins", "sans-serif"],
      },
      fontWeight: {
        light: 200,
        normal: 500,
        bolder: 800,
      },
      width: {
        "30-rem": "30rem",
      },
    },
  },
  plugins: [],
};

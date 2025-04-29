/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}", "!/node_modules/**/*"],
  theme: {
    extend: {
      colors: {
        dark: "#060404",
        light: "#fefbfb",
        primary: "#f45252",
        secondary: "#f2afaf",
      },
      fontFamily: {
        ledger: ["Ledger", "serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};

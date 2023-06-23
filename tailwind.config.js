/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html', "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      zIndex: {
        '1000': '1000',
      }

    },
  },
  plugins: [],
}
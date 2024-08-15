/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(160deg, #210535 36.42%, #102542 46.27%, #142043 50.71%, #1C1645 60.57%)',
      },
      fontFamily: {
        'varela': ['Varela', 'sans-serif'],
        'potta-one': ['"Potta One"', 'sans-serif'],
        'space-mono': ['"Space Mono"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

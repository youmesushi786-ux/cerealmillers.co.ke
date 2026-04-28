/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#002147',
        gold: '#D4AF37', // Make sure you define these colors since you use them in the code
      },
    },
  },
  plugins: [],
}
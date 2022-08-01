/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false,
  important: "#root",
  theme: {
    extend: {},
  },
  plugins: [],
}

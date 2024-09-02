/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./client/index.html",
    "./client/src/pages/login.jsx",
    "./client/src/**/*.{js,jsx,ts,jsx}",
    "./client/src/*.{html,js,jsx}",
    "./client/src/components/*.{html,js,jsx}",
    "./client/src/components/**/*.{html,js,jsx}",
    "./client/src/pages/*.jsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
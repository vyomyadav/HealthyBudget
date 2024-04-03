/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'background': "url('../public/background.png')",
      }
    },
  },
  plugins: [],
}


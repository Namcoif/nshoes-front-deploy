/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'red-vio': '#aa0011',
        'vio-red': '#4b174a'
      },
      boxShadow: {
        'black2': '0px 0px 7px 1px #000000'
      },
      borderRadius: {
        'balloon': '10% 30% 50% 70%',
        'circle': '50%',
        'border-25': '25px'
      },
      borderWidth: {
        '3': '3px'
      }
    },
  },
  plugins: [
  ],

}
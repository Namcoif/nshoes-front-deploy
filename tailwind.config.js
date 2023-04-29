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
        'black2': '0px 0px 7px 1px #000000',
        'black3': 'box-shadow: -10px 11px 6px -6px rgba(0,0,0,0.87); -webkit-box-shadow: -10px 11px 6px -6px rgba(0,0,0,0.87);-moz-box-shadow: -10px 11px 6px -6px rgba(0,0,0,0.87);'
      },
      borderRadius: {
        'balloon': '10% 30% 50% 70%',
        'circle': '50%',
        'border-25': '25px'
      },
      borderWidth: {
        '3': '3px'
      },
      keyframes: {
        animationRotate45: {
          '0%,100%': {
            transform: 'rotate(-12deg)'
          }
        },
        animationAppear: {
          // '0%': {
          //   transform: 'scale(0)'
          // },
          // '50%': {
          //   transform: 'scale(0.4)'
          // },
          // '75%': {
          //   transform: 'scale(0.75)'
          // },
          // '100%': {
          //   transform: 'scale(1)'
          // }
          '0%,100%': {
            transform: 'rotate(-12deg)'
          }
        }
      },
      transitionTimingFunction: {
        tranTimeFunc1: 'cubic-bezier(0.99, 1.41, 0.93, 0.63)',
        tranTimeFunc2: 'cubic-bezier(.2,.63,.56,.86)'
      },
      animation: {
        animationRotate45: 'animationRotate45 forwards',
        animationAppear: 'animationAppear forwards'
      }
    },
  },
  plugins: [
  ],

}
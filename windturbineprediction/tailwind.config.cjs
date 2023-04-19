/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#121DDD",
        secondary: "#000",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimYellow: "#9f994a",
        header: "#3E4296",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes:{
        fadeInLeft:{
          'from':{opacity: '0', transform: 'translateX(-200px)'},
          'to':{opacity: '1'}
        },
        fadeInRight:{
          'from':{opacity: '0', transform: 'translateX(200px)'},
          'to':{opacity: '1'}
        },
        fadeInUp:{
          'from':{opacity: '0', transform: 'translateY(-200px)'},
          'to':{opacity: '1'}
        },
        fadeInDown:{
          'from':{opacity: '0', transform: 'translateY(200px)'},
          'to':{opacity: '1'}
        },
        zoomIn:{
          '0%': {transform:'scale(0.5,0.5)'},
          '100%':{transform:'scale(1,1)'}
        },
        zoomOut:{
          '0%': {transform:'scale(0,0)'},
          '100%':{transform:'scale(1,1)'}
        },
      }
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
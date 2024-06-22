/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/*.{html,js,ejs}",
    "./views/admin/*.{html,js,ejs}",
    "./views/student/*.{html,js,ejs}",
    "./views/teacher/*.{html,js,ejs}",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        pirus: "rgba(0,199,202,255)",
        piruss: "rgb(4,180,188)",
        pirusss: "rgba(196,242,242,255)"

      },
      backgroundColor: {
        customGray: "rgba(243,244,246,255)",
        pirus: "rgba(0,199,202,255)",
        piruss: "rgb(4,180,188)",
        pirusss: "rgba(196,242,242,255)"
      },
    },
  },
  plugins: [require("preline/plugin")],
};

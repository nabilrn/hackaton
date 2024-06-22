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
    },
  },
  plugins: [require("preline/plugin")],
};

const tailwindcss = require("tailwindcss");

module.exports = {
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [tailwindcss("./tailwind.js"), require("autoprefixer")],
};

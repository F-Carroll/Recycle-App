const tailwindcss = require("tailwindcss");

module.exports = {
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [tailwindcss("./tailwind.js"), require("autoprefixer")],
};

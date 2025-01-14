/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      
    },
  },
  darkMode: 'class', // or 'media' or 'class'
  plugins: [
    require('daisyui'),
  ],
  daisyui:{
    themes: ["light", "dark", "sunset","retro"], // list of themes enabled
    styled: true, // set true to get styled components predefined by DaisyUI, false to get plain css
    base : true, // set true to apply background and foreground colors to body
    utils: true, // set true to gain utility classes for responsive design 
    prefix: "", // set the prefix of daisyui components - in this case it is empty
    themeRoot: ":root", // Apply theme variables globally via :root
    
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        background: "#E6F3F8",
        accent : "#FFA000",
        primary: "#0077C8",
        primaryAccent: "#005A9E",
        secondary: "#4CAF50",
        secondaryAccent: "#388E3C",
        headerText: "#1A1B41",
        bodyText: "#333333",
        link: "#0056B3",
        linkHover: "#003D82",
        success: "#4CAF50",
        error: "#F44336",
        warning: "#FFC107",
        info: "#2196F3",
        divider: "#CED4DA",
        cardBackground: "#F5F5F5",
        buttonPrimary: "#0077C8",
        buttonHover: "#005A9E",
        buttonSecondary: "#4CAF50",
        buttonText: "#FFFFFF",
        header: "#191E24",
        footer: "#191E24",
        nav: "#191E24",
      }
      
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui:{
    themes: false, // set false to disable themes
    styled: true, // set true to get styled components predefined by DaisyUI, false to get plain css
    base : true, // set true to apply background and foreground colors to body
    utils: true, // set true to gain utility classes for responsive design 
    prefix: "", // set the prefix of daisyui components - in this case it is empty
    themeRoot: ":root", // Apply theme variables globally via :root
    
  },
};

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
        background: "#ADD8E6",
        primary: "#0077C8",
        primaryAccent: "#004A8F",
        secondary: "#A3D9B1",
        secondaryAccent: "#2B5B34",
        headerText: "#1A1B41",
        bodyText: "#343A40",
        link: "#007BFF",
        linkHover: "#0056B3",
        success: "#38A169",
        error: "#E53E3E",
        warning: "#D69E2E",
        info: "#63B3ED",
        divider: "#CED4DA",
        cardBackground: "#F5F5F5",
        buttonPrimary: "#00A8E8",
        buttonHover: "#0096D6",
        buttonSecondary: "#B2DFDB",
        buttonText: "#FFFFFF",
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

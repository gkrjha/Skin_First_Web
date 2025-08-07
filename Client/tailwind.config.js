/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "360px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      colors: {
        primary: "#2260FF",
        secondary: "#CAD6FF",
        dark: "#070707",
        light: "#FFFFFF",
      },
      fontFamily: {
        spartan: ['"League Spartan"', "sans-serif"],
      },
    },
  },
  plugins: [],
};

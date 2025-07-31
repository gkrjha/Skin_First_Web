/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xx: "350px",
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1600px",
      },
      colors: {
        primary: "#2260FF",
        secondary: "#CAD6FF",
        dark: "#070707",
        light: "#FFFFFF",
      },
      fontFamily: {
        spartan: ['"League Spartan"', "sans-serif"], // Custom font name
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      backgroundImage: {
        login: "url('/assets/bg_login.jpg')",
        "empty-data": "url('/assets/empty_data.jpg')",
      },
      colors: {
        base: {
          DEFAULT: "#01A7FD",
          50: "#B7E6FF",
          100: "#A3DFFF",
          200: "#7AD1FE",
          300: "#51C3FE",
          400: "#29B5FE",
          500: "#01A7FD",
          600: "#0182C5",
          700: "#015D8D",
          800: "#003855",
          900: "#00131D",
          950: "#000102",
        },
      },
    },
  },
  plugins: [],
};

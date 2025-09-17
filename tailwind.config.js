/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandYellow: "#FFD600",
        silver: "#e0e0e0",
        warning: "#EF4444",
        brandText: "#3B3B3B"
      },
      boxShadow: {
        card: "0 4px 32px 0 rgba(0,0,0,0.15)",
      },
      borderRadius: {
        xl: "1.3rem"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      }
    },
  },
  plugins: [],
}

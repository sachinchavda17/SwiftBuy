/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable class-based dark mode
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background-color)",
        text: "var(--text-color)",
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        ternary: "var(--ternary-color)",
        seventh: "var(--seventh-color)",
        border: "var(--border-color)",
        error:"var(--error-color)"
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "udo-primary": "#184B8C",
        "udo-steel": "#6B7A90",
        "udo-bg": "#F9FAFB",
      },
      boxShadow: {
        soft: "0 4px 14px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};

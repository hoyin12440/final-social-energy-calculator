/** @type {import('tailwindcss').Config} */
export default {
  // Scan these files for class names so Tailwind only includes what's used
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Enable dark mode by toggling the 'dark' class on <html>
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}

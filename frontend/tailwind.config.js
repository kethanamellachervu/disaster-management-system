/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'emergency-red': '#dc2626',
        'warning-amber': '#f59e0b',
        'success-green': '#16a34a',
      }
    },
  },
  plugins: [],
}

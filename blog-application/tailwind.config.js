/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'gradient-blue-start':'#3b83f6',
        'gradient-blue-end': '#1e3a8a',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: '#0047AB',      // Royal Blue
        brandNavy: '#0A1F44',      // Deep Navy
        brandGold: '#FBBC05',      // Google Gold
        brandTeal: '#0d94b4',      // Legacy light-teal highlights
        brandIce: '#F4F7FC',       // Clean background
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 8px 30px rgb(0 0 0 / 0.06)',
        'premium-hover': '0 20px 40px rgb(0 0 0 / 0.12)',
        'glow-blue': '0 0 15px rgba(0, 71, 171, 0.3)',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: '#0F4CFF',      // Royal Blue
        brandNavy: '#0F172A',      // Corporate Navy / Dark Slate Background
        brandRed: '#DC2626',       // Medical Red
        textSlate: '#1E293B',      // Dark Slate Text
        brandGold: '#F59E0B',      // Warm Gold for stars/reviews
        brandIce: '#F8FAFC',       // Clean, professional background
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        nunito: ['Nunito Sans', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 4px 20px rgba(15, 23, 42, 0.05)',
        'premium-hover': '0 12px 30px rgba(15, 23, 42, 0.1)',
      }
    },
  },
  plugins: [],
}

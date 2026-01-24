module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#E94E1B', // Terra Cotta / Nigerian Clay
          secondary: '#1C3F34', // Deep Green / Forest
          accent: '#FFD700', // Gold
          background: '#F9F7F2', // Warm Paper
        }
      },
    },
  },
  plugins: [],
}

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#013220', // Midnight Emerald
          secondary: '#D4AF37', // Polished Gold
          accent: '#004D40', // Deep Teal
          background: '#050808', // Deepest Slate
          surface: '#0D1413', // Glassmorphic surface
          text: '#F9F7F2', // Warm Ivory text
          muted: '#8A9A98', // Muted slate green
        }
      },
      fontFamily: {
        serif: ['serif'], // Use system serif for elegant titles
      }
    },
  },
  plugins: [],
}


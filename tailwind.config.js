module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Modern African Palette (e.g. Earthy tones, Vibrant Accents)
        // Adjusting Shadcn tokens for mobile if needed, or defining new ones.
        brand: {
          primary: '#E94E1B', // Terra Cotta / Nigerian Clay
          secondary: '#1C3F34', // Deep Green / Forest
          accent: '#FFD700', // Gold
          background: '#F9F7F2', // Warm Paper
        }
      },
       fontFamily: {
        // We'll rely on default or load fonts later
      }
    },
  },
  plugins: [],
}

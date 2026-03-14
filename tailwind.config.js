module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          // Core palette
          bg:        '#0D1410', // App background (near-black green)
          surface:   '#1A2118', // Cards & panels
          elevated:  '#233022', // Elevated surfaces
          // Accents
          green:     '#2D6A4F', // Emerald green (CTAs, active tabs)
          'green-light': '#3A7D5E',
          gold:      '#D4AF37', // Polished gold (headings, prices, accents)
          'gold-light': '#F5C518',
          // Text
          text:      '#FFFFFF', // Primary text
          muted:     '#8A9A98', // Secondary / placeholder text
          // Semantic
          correct:   '#22C55E', // Correct answer green
          wrong:     '#EF4444', // Wrong answer red
        }
      },
    },
  },
  plugins: [],
}


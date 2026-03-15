module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          // ── Stitch Midnight Emerald & Polished Gold ──────────────────────────
          bg:              '#0f1412',
          surface:         '#1c211e',
          elevated:        '#262b29',
          highest:         '#313633',
          // Accents
          green:           '#59de9b',
          'green-dim':     '#004e2f',
          gold:            '#e9c349',
          'gold-dim':      '#af8d11',
          // Text
          text:            '#dfe4e0',
          muted:           '#bfc9c4',
          faint:           '#89938f',
          // Semantic
          correct:         '#59de9b',
          wrong:           '#93000a',
          outline:         '#3f4945',
        }
      },
    },
  },
  plugins: [],
}


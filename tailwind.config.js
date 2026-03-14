module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          // ── Stitch Midnight Emerald & Polished Gold ──────────────────────────
          bg:              '#0f1412', // surface (darkest base)
          surface:         '#1c211e', // surface_container
          elevated:        '#262b29', // surface_container_high
          highest:         '#313633', // surface_container_highest
          // Accents
          green:           '#59de9b', // primary
          'green-dim':     '#004e2f', // primary_container
          gold:            '#e9c349', // secondary
          'gold-dim':      '#af8d11', // secondary_container
          // Text
          text:            '#dfe4e0', // on_surface
          muted:           '#bfc9c4', // on_surface_variant
          faint:           '#89938f', // outline
          // Semantic
          correct:         '#59de9b', // primary
          wrong:           '#93000a', // error_container
          outline:         '#3f4945', // outline_variant
        }
      },
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        // KrishiMitra Agricultural Palette
        forest: {
          50:  "#EBF3ED", // Soft surface background
          100: "#E2EAD8", // Light mint border / badge
          200: "#D0DEC0", // Soft sage card border
          300: "#86C39C",
          400: "#3D8B5A", // Secondary green
          500: "#196C3E", // Medium forest green
          600: "#164A34", // Primary Deep Forest Green
          700: "#0F3C28",
          800: "#003320", // Deep dark green for header/sidebar
          900: "#002416",
        },
        ivory: {
          DEFAULT: "#F8F6F0", // Warm off-white page background
          surface: "#EBF3ED", // Soft surface
          card: "#FFFFFF",
          border: "#D0DEC0",
        },
        water: {
          DEFAULT: "#4C9BB8", // Water metric accent
          light: "#EAF4F8",
          border: "#B2DBE8",
        },
        warning: {
          DEFAULT: "#D9902F", // Warning amber
          light: "#FDF5EA",
          border: "#F7D8B5",
        },
        danger: {
          DEFAULT: "#C85A45", // Danger red
          light: "#FDF0EE",
          border: "#F5C2BA",
        },
        krishiText: {
          main: "#1E2924",
          muted: "#596A61",
        },
        brand: {
          50:  "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#164A34",
          900: "#003320",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem", // 16px
        "3xl": "1.5rem", // 24px rounded card
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
}

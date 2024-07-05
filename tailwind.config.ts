import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./content/**/*.mdx", "./public/**/*.svg"],
  theme: {
    extend: {
      colors: {
        custom: {
          "light-from": "#f3f4f6", // light gray
          "light-to": "#e5e7eb", // slightly darker gray
          "dark-from": "#111827", // dark gray
          "dark-to": "#000000", // black
        },
      },
      backgroundImage: {
        "gradient-light":
          "linear-gradient(to bottom right, var(--tw-gradient-stops))",
        "gradient-dark":
          "linear-gradient(to bottom right, var(--tw-gradient-stops))",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: "class",
  plugins: [],
} satisfies Config;

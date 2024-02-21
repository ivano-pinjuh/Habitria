import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "prim-100": "#FF4081",
        "prim-200": "#FF79B0",
        "prim-300": "#FFE4FF",

        "accent-l-100": "#00BCD4",
        "accent-l-200": "#005E74",
        "accent-d-100": "#00E5FF",
        "accent-d-200": "#00829B",

        "text-l-100": "#333333",
        "text-l-200": "#5C5C5C",
        "text-d-100": "#FFFFFF",
        "text-d-200": "#E0E0E0",

        "bg-l-100": "#F5F5F5",
        "bg-l-200": "#EBEBEB",
        "bg-l-300": "#C2C2C2",
        "bg-d-100": "#1A1A1A",
        "bg-d-200": "#292929",
        "bg-d-300": "#404040",
      }
    },
  },
  plugins: [
    require('tailwindcss-patterns'),
  ],
};
export default config;

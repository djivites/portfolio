import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-orbitron)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        cyan: "0 0 28px rgba(34, 211, 238, 0.55)",
        violet: "0 0 28px rgba(168, 85, 247, 0.55)"
      }
    }
  },
  plugins: []
};

export default config;

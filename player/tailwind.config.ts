import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#FA8A5D',
        dark: {
          border: '#41444E',
          100: '#A1A1A1',
          700: '#282C37',
          800: '#1F202B',
        }
      },
    },
  },
  plugins: [],
};
export default config;

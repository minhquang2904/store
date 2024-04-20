import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    boxShadow: {
      sm: "0 2px 20px rgba(0, 0, 0, 0.12)",
    },
    colors: {
      button: "#131118",
      text: "#131118",
      border: "#131118",
      hover1: "#e3e7f3",
      primary: "#F3F4F4",
      white: "#fff",
      secondary: "#ff6f61",
      sub: "#00000080",
    },
    padding: {
      sm: "8px",
      md: "16px",
      lg: "32px",
      xl: "64px",
    },
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "2rem",
      "2xl": "3rem",
      "3xl": "4rem",
      "4xl": "5rem",
      "5xl": "6rem",
    },
    borderRadius: {
      none: "0",
      DEFAULT: "4px",
      sm: "8px",
      md: "16px",
      lg: "32px",
      full: "64px",
      large: "128px",
      half: "50%",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

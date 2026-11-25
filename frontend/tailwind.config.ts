import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1B2B22",
        violet: {
          DEFAULT: "#3D8B68",
          50: "#F4F8F5",
          100: "#E8F3EC",
          200: "#D0E5D7",
          300: "#A9CFB7",
          400: "#7EB393",
          500: "#579B76",
          600: "#3D8B68",
          700: "#327454",
          800: "#286548",
          900: "#204F3A",
        },
        lilac: "#E8F3EC",
      },
      boxShadow: {
        soft: "0 18px 60px rgba(40, 101, 72, .09)",
      },
    },
  },
  plugins: [],
};

export default config;

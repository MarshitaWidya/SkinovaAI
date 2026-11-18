import type { Config } from "tailwindcss";
const config: Config = { content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"], theme: { extend: { colors: { ink: "#17152B", violet: "#7357E8", lilac: "#F1EEFF" }, boxShadow: { soft: "0 18px 60px rgba(45, 35, 100, .09)" } } }, plugins: [] };
export default config;

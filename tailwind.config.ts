import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "gray-800": "#272727",
        "gray-700": "#414144",
        "gray-500": "#818181",
        "gray-600": "#909196",
        "blue-800": "#384E78",
        "blue-700": "#436AB2",
        "blue-600": "#5573AB",
        "green-800": "#9AABAD",
        "green-700": "#AFBDBE",
        "red-800": "#FC0707"
      }
    },
  },
  plugins: [],
};
export default config;

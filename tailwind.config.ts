import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      bg_ingo: "#EDEEF1",
      text_gray: "#081d1480",
      input_text: "#081D14",
      light_red: "#fad6ca33",
      title: "#EB592A",
      bg_orange: "#FAD6CA80",
      border_orange: "#EE754E",
      bg_card: "#FFF7F4",
      black: "#000",
      white: "#ffff",
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#247B54",
      yellow: "#ffc82c",
      gray_dark: "#273444",
      gray_title: "#5E6579",
      bg_gray: "#EDEEF1",
      gray: "#8492a6",
      gray_light: "#d3dce6",
      line_color: "#A6ABB7",
      button_bg: "#14452F",
      red: "#DC143C",
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

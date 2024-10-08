import type { Config } from "tailwindcss";
import DefaultTheme from "tailwindcss/defaultTheme";
import HeadlessUI from "@headlessui/tailwindcss";
import DaisyUI from "daisyui";
import withMT from "@material-tailwind/react/utils/withMT";

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@rami-dv/mapajoara/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  daisyui: {
    themes: ["light"],
    base: false
  },
  theme: {
    
    extend: {
      aspectRatio: {
        "4/3": "4 / 3",
      },
      fontFamily: {
        sans: ['"Roboto"', ...DefaultTheme.fontFamily.sans],
        ubuntu: "Ubuntu",
        roboto: "Roboto",
      },
      screens: {
        "6xl": "1152px",
      },
      colors: {
        f4g_red: "#552f27",
        f4g_blue: "#009575",
        f4g_orange: "#d86e39",
        f4g_green: "#a6bf64",
      },
      backgroundImage: {
        "footer-texture": "url('/img/footer-texture.png')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [HeadlessUI, DaisyUI],
};
export default withMT(config);

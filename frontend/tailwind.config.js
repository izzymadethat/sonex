import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {}
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        "sonex-dark": {
          extend: "dark",
          colors: {
            background: "#212121",
            foreground: "#e8e8e8",
            primary: {
              DEFAULT: "#ffff00"
            }
          }
        }
      }
    })
  ]
};

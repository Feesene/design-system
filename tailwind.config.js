/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        content: {
          primary: "#7b7b7b",
          secondary: "#9c9c9c",
          ternary: "#c8c8c8",
        },
        default: {
          content: "#363636",
          DEFAULT: "#9c9c9c",
          50: "#f7f7f7",
          100: "#ededed",
          200: "#dfdfdf",
          300: "#c8c8c8",
          400: "#adadad",
          500: "#9c9c9c",
          600: "#888888",
          700: "#7b7b7b",
          800: "#676767",
          900: "#545454",
          950: "#363636",
        },
        primary: {
          content: "#ffffff",
          DEFAULT: "#9d00ff",
          50: "#f6e8ff",
          100: "#e4b9ff",
          200: "#d28bff",
          300: "#c15dff",
          400: "#af2eff",
          500: "#9d00ff",
          600: "#8000d1",
          700: "#6400a2",
          800: "#470074",
          900: "#2b0046",
          950: "#0e0017",
        },
        secondary: {
          content: "#ffffff",
          DEFAULT: "#F89F5B",
          50: "#fef2e9",
          100: "#fcd8bc",
          200: "#fabe90",
          300: "#f8a463",
          400: "#f68a37",
          500: "#f5700a",
          600: "#c85b09",
          700: "#9c4707",
          800: "#6f3305",
          900: "#431e03",
          950: "#160a01",
        },
        info: {
          content: "#ffffff",
          DEFAULT: "#42ebe8",
          50: "#eafdfc",
          100: "#c0f8f7",
          200: "#96f4f2",
          300: "#6cefed",
          400: "#42ebe8",
          500: "#18e7e3",
          600: "#14bdba",
          700: "#109391",
          800: "#0b6967",
          900: "#073f3e",
          950: "#021515",
        },
        success: {
          content: "#ffffff",
          DEFAULT: "#50dd6c",
          50: "#ecfbef",
          100: "#c5f4ce",
          200: "#9eecad",
          300: "#77e58d",
          400: "#50dd6c",
          500: "#29d64c",
          600: "#22af3e",
          700: "#1a8830",
          800: "#136122",
          900: "#0b3a15",
          950: "#041307",
        },
        warning: {
          content: "#ffffff",
          DEFAULT: "#e6e944",
          50: "#fcfdea",
          100: "#f7f8c1",
          200: "#f7f8c1",
          300: "#ebee6e",
          400: "#e6e944",
          500: "#e0e51a",
          600: "#b8bb16",
          700: "#8f9111",
          800: "#66680c",
          900: "#3d3e07",
          950: "#141502",
        },
        error: {
          content: "#ffffff",
          DEFAULT: "#f13c3c",
          50: "#fde9e9",
          100: "#fabebe",
          200: "#f79393",
          300: "#f46868",
          400: "#f13c3c",
          500: "#ee1111",
          600: "#c30e0e",
          700: "#970b0b",
          800: "#6c0808",
          900: "#410505",
          950: "#160202",
        },
        dark: {
          content: "#101010",
          DEFAULT: "#363636",
          50: "#ebebeb",
          100: "#c1c1c1",
          200: "#a3a3a3",
          300: "#787878",
          400: "#5e5e5e",
          500: "#363636",
          600: "#313131",
          700: "#262626",
          800: "#1e1e1e",
          900: "#171717",
          950: "#141414",
        },
      },
      screens: {
        desktop: "1280px",
        tablet: "768px",
        mobile: "640px",
      },
      fontSize: {
        "2xs": "0.625rem",
      },
      fontFamily: {
        sans: ["Roboto", "Nunito Sans", "sans-serif"],
        mono: ["Roboto Mono, monospace"],
      },
      boxShadow: {
        "raise-default":
          "0 14px 26px -12px rgba(223, 223, 223, 42%), 0 4px 23px 0 rgba(0, 0, 0, 12%), 0 8px 10px -5px rgba(223, 223, 223, 20%)",
        "raise-primary":
          "0 14px 26px -12px rgba(90, 129, 250, 42%), 0 4px 23px 0 rgba(0, 0, 0, 12%), 0 8px 10px -5px rgba(90, 129, 250, 20%)",
        "raise-secondary":
          "0 14px 26px -12px rgba(43, 49, 138, 42%), 0 4px 23px 0 rgba(0, 0, 0, 12%), 0 8px 10px -5px rgba(43, 49, 138, 20%)",
        "raise-info":
          "0 14px 26px -12px rgba(135, 160, 217, 42%), 0 4px 23px 0 rgba(0, 0, 0, 12%), 0 8px 10px -5px rgba(135, 160, 217, 20%)",
        "raise-success":
          "0 14px 26px -12px rgba(40, 161, 129, 42%), 0 4px 23px 0 rgba(0, 0, 0, 12%), 0 8px 10px -5px rgba(40, 161, 129, 20%)",
        "raise-warning":
          "0 14px 26px -12px rgba(230, 164, 81, 42%), 0 4px 23px 0 rgba(0, 0, 0, 12%), 0 8px 10px -5px rgba(230, 164, 81, 20%)",
        "raise-error":
          "0 14px 26px -12px rgba(217, 90, 90, 42%), 0 4px 23px 0 rgba(0, 0, 0, 12%), 0 8px 10px -5px rgba(217, 90, 90, 20%)",
        "light-box": "-1px 3px 10px 0 rgba(0, 0, 0, 6%)",
        thumb: "0px 1px 6px rgba(0, 0, 0, 50%)",
        "thumb-default": "0px 0px 6px rgba(103, 103, 103, 100%), 0px 1px 6px rgba(0, 0, 0, 20%)",
        "thumb-primary": "0px 0px 6px rgba(37, 59, 235, 100%), 0px 1px 6px rgba(0, 0, 0, 20%)",
        "thumb-secondary": "0px 0px 6px rgba(43, 49, 138, 100%), 0px 1px 6px rgba(0, 0, 0, 20%)",
        "thumb-info": "0px 0px 6px rgba(135, 160, 217, 100%), 0px 1px 6px rgba(0, 0, 0, 20%)",
        "thumb-warning": "0px 0px 6px rgba(224, 138, 47, 100%), 0px 1px 6px rgba(0, 0, 0, 20%)",
        "thumb-error": "0px 0px 6px rgba(217, 90, 90, 100%), 0px 1px 6px rgba(0, 0, 0, 20%)",
        "thumb-success": "0px 0px 6px rgba(74, 189, 154, 100%), 0px 1px 6px rgba(0, 0, 0, 20%)",
      },
    },
  },
  plugins: [require("tailwindcss-animated"), require("tailwindcss-neumorphism")],
};

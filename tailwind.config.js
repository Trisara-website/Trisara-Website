/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#fbf6f1",
        ink: "#241512",
        maroon: "#6b0f1a",
        maroonDeep: "#4a0b13",
        vermillion: "#a31621",
        gold: "#e3b96a",
        goldDeep: "#a9812f",
      },
      fontFamily: {
        display: ["var(--font-inter)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        fadein: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        popin: {
          "0%": { opacity: 0, transform: "translateY(18px) scale(.97)" },
          "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
        },
        bob: {
          "0%,100%": { transform: "translateX(-50%) translateY(0)" },
          "50%": { transform: "translateX(-50%) translateY(8px)" },
        },
      },
      animation: {
        fadein: "fadein .5s ease",
        popin: "popin .45s cubic-bezier(.22,.8,.32,1)",
        bob: "bob 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

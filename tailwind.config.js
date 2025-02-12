/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app.vue",
    "./components/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        body: "gray",
        primary: "#000000",
      },
      fontFamily: {
        sans: ["sans-serif"],
      },
    },
  },
  plugins: [],
};

import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        "4xl": "32px",
      },
    },
  },
  plugins: [],
} satisfies Config;

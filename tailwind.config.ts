import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        "2.5xl": "20px",
        "4xl": "32px",
      },
      width: {
        "1/7": "14.2857143%",
        "2/7": "28.5714286%",
        "3/7": "42.8571429%",
        "4/7": "57.1428571%",
        "5/7": "71.4285714%",
        "6/7": "85.7142857%",
      },
      scale: {
        "40" : "0.4",
      },
      colors: {
        emotionDarkBlue: '#364B85',
        emotionLightBlue: '#8693B6',
        emotionGray: '#5B5D62',
        emotionLightGray: '#E3E9F6',
        emotionSidebarBlue: '#F1F6FF',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0'},
          to: { opacity: '1' },
        },
      },
      animation: {
        "fade-in": "fadeIn 1s ease-in-out",
      },
    },
  },
  plugins: [],
} satisfies Config;

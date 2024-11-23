import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Poppins',
          'Playfair Display',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
        playfair: ['Playfair Display', 'ui-sans-serif', 'system-ui', 'serif'],
      },
      boxShadow: {
        '3xl': ['rgb(38, 57, 77) 0px 20px 30px -10px'],
      },
      colors: {
        primary: '#d39738',
      },
    },
  },
  plugins: [],
} satisfies Config;

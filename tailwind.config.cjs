/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      gunmetal: {
        700: '#3e3f4e',
        800: '#2b2c37',
      },
      indigo: '#e4ebfa',
      red: {
        400: '#ff9898',
        600: '#ea5555',
      },
      richBlack: '#000112',
      slate: '#828fa3',
      violet: {
        50: '#f4f7fd',
        400: '#a8a4ff',
        700: '#635fc7',
      },
      zinc: '#20212c',
    },
    extend: {},
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      blue: '#0827f5',
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
      yellow: '#ffb81c',
      zinc: '#20212c',
      gradient: 'rgba(0, 0, 0, 0.7)',
    },
    fontSize: {
      xl: '1.5rem',
      lg: '1.125rem',
      md: '0.9375rem',
      sm: '0.75rem',
      'body-lg': ['0.8125rem', '1.75'],
      'body-md': '0.75rem',
    },
    extend: {},
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements-react/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'black-custom': '#000400',
        'blue-custom': {
          DEFAULT: '#03438D',
          light: '#E2EDFA',
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '12px',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [import('tw-elements/plugin.cjs')],
};

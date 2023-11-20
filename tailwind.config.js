/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      'mobile': {'min': '500px', 'max': '799px'},
      'tablet': {'min': '800px', 'max': '1279px'},
      'desktop': {'min': '1280px'}
    },
  },
  plugins: [],
}

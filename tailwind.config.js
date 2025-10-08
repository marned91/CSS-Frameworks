/** @type {import('tailwindcss').Config} */
export default {
  content: ['./**/*.{html,js,ts}', '!./node_modules/**/*'],
  theme: {
    extend: {
      fontFamily: {
        h1: ['Outfit', 'sans-serif'],
        'headlines-nav': ['Lato', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
      colors: {
        brand: {
          light: '#B4DDD4',
          DEFAULT: '#42A18D',
          dark: '#474AE4',
        },
        accent: {
          light: '#6BD1B7',
          DEFAULT: '#184D7A',
          dark: '#000000',
        },
        highlight: '#CB88FF',
        'post-body': '#E0E6E5',
        'background-green': '#BDE3DB',
        'background-gray': '#D9D9D9',
      },
      screens: {
        xs: '460px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      boxShadow: {
        '3xl': '0 10px 30px rgba(0, 0, 0, 0.5)',
        custom: '0 20px 50px rgba(0, 0, 0, 0.7)',
      },
    },
  },
  plugins: [],
};

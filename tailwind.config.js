/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f3ff',
          100: '#e4e6ff',
          200: '#c7ccff',
          500: '#7c5cfc',
          600: '#643df7',
          700: '#4a2cc3',
        },
        accent: {
          100: '#fbefff',
          500: '#f472b6',
        },
        slate: {
          950: '#0f172a',
        },
      },
      boxShadow: {
        card: '0 20px 45px -24px rgba(15, 23, 42, 0.35)',
      },
      fontFamily: {
        display: ['Pretendard Variable', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};


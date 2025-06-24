/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'wire-flicker': {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': {
            opacity: '0.9',
            height: '2px',
            transform: 'translateY(0)',
          },
          '20%': {
            opacity: '0',
            height: '1px',
            transform: 'translateY(-5px)',
          },
          '24%': {
            opacity: '0.4',
            height: '3px',
            transform: 'translateY(5px)',
          },
          '55%': {
            opacity: '0.3',
            height: '1px',
          },
        },
      },
      animation: {
        'wire-flicker': 'wire-flicker 3s infinite',
      },
      
    },
  },
  plugins: [],
}

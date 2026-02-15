/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette derived from logo: Dark Purple, Red, Black, White
        primary: {
          50: '#f3f1f7',
          100: '#e7e1ef',
          200: '#cfc3de',
          300: '#b7a5ce',
          400: '#9f87bd',
          500: '#7b5aa5', // base purple
          600: '#5f4585',
          700: '#4a3568', // dark purple
          800: '#37284e',
          900: '#261c36',
          950: '#1a1426',
        },
        secondary: {
          50: '#fff1f1',
          100: '#ffe0e0',
          200: '#ffc1c1',
          300: '#ffa3a3',
          400: '#ff6f6f',
          500: '#ef4444', // brand red
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        black: '#0b0b0c',
        white: '#ffffff',
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
        'display': ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

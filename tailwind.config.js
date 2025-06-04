/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        "blink-slow": {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        "blink-fast": {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        pulse: {
          '0%, 100%': { 
            transform: 'scale(1)',
            filter: 'drop-shadow(0 0 5px rgba(255,255,255,1))'
          },
          '50%': { 
            transform: 'scale(1.1)',
            filter: 'drop-shadow(0 0 20px rgba(255,255,255,1))'
          },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
      },
      animation: {
        'blink-slow': 'blink-slow 3s ease-in-out infinite',
        'blink-fast': 'blink-fast 4s ease-in-out infinite',
        'pulse': 'pulse 2s ease-in-out infinite',
        'fadeIn': 'fadeIn 1s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}

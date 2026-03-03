/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
        },
        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
        },
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
        },
      },
      fontFamily: {
        display: ['Baloo 2', 'cursive'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'clay': '20px',
        'clay-lg': '24px',
      },
      boxShadow: {
        'clay': '4px 4px 8px rgba(79, 70, 229, 0.15), inset -2px -2px 8px rgba(255, 255, 255, 0.8)',
        'clay-sm': '2px 2px 4px rgba(79, 70, 229, 0.1), inset -1px -1px 4px rgba(255, 255, 255, 0.8)',
        'clay-lg': '6px 6px 12px rgba(79, 70, 229, 0.2), inset -3px -3px 10px rgba(255, 255, 255, 0.9)',
        'clay-inset': 'inset 2px 2px 6px rgba(79, 70, 229, 0.1), inset -2px -2px 6px rgba(255, 255, 255, 0.7)',
      },
      animation: {
        'bounce-soft': 'bounce-soft 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
      keyframes: {
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
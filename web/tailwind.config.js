/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.9' },
        },
        tentacle: {
          '0%, 100%': { transform: 'rotate(-3deg) scaleY(1)' },
          '50%': { transform: 'rotate(3deg) scaleY(1.05)' },
        },
        ripple: {
          '0%, 100%': { transform: 'translateX(-50%) scaleX(1)', opacity: '0.3' },
          '50%': { transform: 'translateX(-50%) scaleX(1.05)', opacity: '0.6' },
        },
        floatLight: {
          '0%, 100%': { transform: 'translateX(-50%) translateY(0px)', opacity: '0.6' },
          '50%': { transform: 'translateX(-50%) translateY(-20px)', opacity: '0.9' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulse: 'pulse 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
        tentacle: 'tentacle 4s ease-in-out infinite',
        ripple: 'ripple 4s ease-in-out infinite',
        floatLight: 'floatLight 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

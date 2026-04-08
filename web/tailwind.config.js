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
        titleGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 30px rgba(140,120,220,0.6)) drop-shadow(0 0 60px rgba(120,100,200,0.3))' },
          '50%': { filter: 'drop-shadow(0 0 40px rgba(140,120,220,0.8)) drop-shadow(0 0 80px rgba(120,100,200,0.5))' },
        },
        cardGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
        buttonPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.02)' },
        },
        energyFlow: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        particleFloat: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)', opacity: '0.4' },
          '25%': { transform: 'translateY(-8px) translateX(3px)', opacity: '0.6' },
          '50%': { transform: 'translateY(-4px) translateX(-2px)', opacity: '0.5' },
          '75%': { transform: 'translateY(-12px) translateX(2px)', opacity: '0.7' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulse: 'pulse 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
        tentacle: 'tentacle 4s ease-in-out infinite',
        ripple: 'ripple 4s ease-in-out infinite',
        floatLight: 'floatLight 6s ease-in-out infinite',
        titleGlow: 'titleGlow 4s ease-in-out infinite',
        cardGlow: 'cardGlow 6s ease-in-out infinite',
        buttonPulse: 'buttonPulse 3s ease-in-out infinite',
        energyFlow: 'energyFlow 3s linear infinite',
        particleFloat: 'particleFloat 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

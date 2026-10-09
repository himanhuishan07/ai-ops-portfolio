/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#050a14',       // Optimized deep space background
          card: '#0a1122',     // Elevated dark panel background
          border: 'rgba(0, 240, 255, 0.2)', // Maintained your alpha cyan border
          accent: '#00f0ff',   // Core cyber cyan highlight
          text: '#94a3b8'      // Muted slate text for readability
        }
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }, 
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
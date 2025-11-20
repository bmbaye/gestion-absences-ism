/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        monda: ['Monda', 'sans-serif'],
      },
      colors: {
        primary: '#F0A611',
        glass: 'rgba(255,255,255,0.15)',
        glassStrong: 'rgba(255,255,255,0.30)',
        second: '#D90B0B',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(to bottom right, rgba(255,255,255,0.12), rgba(255,255,255,0.05))',
      },
    },
  },
  plugins: [],
}


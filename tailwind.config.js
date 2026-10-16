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
        paper: 'var(--paper)',
        ink: 'var(--ink)',
        rust: 'var(--rust)',
        kraft: 'var(--kraft)',
      },
      fontFamily: {
        title: ['var(--font-title)', '"Arial Narrow"', 'sans-serif'],
        hand: ['var(--font-hand)', '"Comic Sans MS"', 'cursive'],
        stamp: ['var(--font-stamp)', '"Courier New"', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

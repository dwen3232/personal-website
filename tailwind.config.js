const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/content/**/*.{md,mdx}',
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
        read: ['var(--font-read)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    // Page-shape variants: query the nearest page container (a book page or a scroll sheet),
    // not the viewport. Book pages are ~0.7 wide-to-tall; scroll sheets are taller.
    plugin(({ addVariant }) => {
      addVariant('tall', '@container (max-aspect-ratio: 3/5)')
      addVariant('spread', '@container (min-aspect-ratio: 3/5)')
    }),
  ],
}

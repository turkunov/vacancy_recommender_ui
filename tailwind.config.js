/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
      extend: {
        colors: {
          orange: colors.orange,
          rose: colors.rose,
          indigo: colors.indigo,
          fuchsia: colors.fuchsia,
          gray: colors.gray,
          pastel: '#787878',
          skin: '#9e9e9e'
        },
    },
  },
  variants: {
    animation: ['responsive', 'motion-safe', 'motion-reduce', 'hover'],
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
          '.scrollbar': {
              overflowY: 'auto',
              scrollbarColor: `${theme('colors.pastel')} ${theme('colors.skin')}`,
              scrollbarWidth: '5px',
          },
          '.scrollbar_dark': {
            overflowY: 'auto',
            scrollbarColor: `${theme('colors.skin')} ${theme('colors.pastel')}`,
            scrollbarWidth: '5px',
          },
          '.scrollbar::-webkit-scrollbar': {
              height: '6px',
              width: '6px',
          },
          '.scrollbar_dark::-webkit-scrollbar': {
            height: '6px',
            width: '6px',
          },
          '.scrollbar::-webkit-scrollbar-thumb': {
              backgroundColor: theme('colors.pastel'),
              border: '4px solid transparent',
              borderRadius: '8px'
          },
          '.scrollbar_dark::-webkit-scrollbar-thumb': {
              backgroundColor: theme('colors.skin'),
              border: '4px solid transparent',
              borderRadius: '8px'
          },
          '.scrollbar::-webkit-scrollbar-track-piece': {
              backgroundColor: theme('colors.skin'),
          },
          '.scrollbar_dark::-webkit-scrollbar-track-piece': {
              backgroundColor: theme('colors.pastel'),
          },
      });
    }),
  ],
}

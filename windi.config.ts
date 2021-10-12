import { defineConfig } from 'windicss/helpers'
import plugin from 'windicss/plugin'

export default defineConfig({
  darkMode: 'class',
  theme: {
    extend: {
      fontSize: {
        xxs: '.6rem',
      },
    },

    screens: {
      sm: { min: '576px' },
      md: { min: '768px' },
      lg: { min: '992px' },
      xl: { min: '1200px' },
      '2xl': { min: '1400px' },
    },
  },

  corePlugins: {
    container: false,
  },

  plugins: [
    plugin(({ addComponents, theme }) => {
      const screens = theme('screens', {}) as { [key: string]: { min: string } }

      addComponents({
        '.container': {
          paddingLeft: theme('spacing.3') as string,
          paddingRight: theme('spacing.3') as string,
          marginRight: 'auto',
          marginLeft: 'auto',
          width: '100%',

          [`@media (min-width: ${screens.sm.min})`]: {
            maxWidth: '540px',
          },
          [`@media (min-width: ${screens.md.min})`]: {
            maxWidth: '720px',
          },
          [`@media (min-width: ${screens.lg.min})`]: {
            maxWidth: '960px',
          },
          [`@media (min-width: ${screens.xl.min})`]: {
            maxWidth: '1140px',
          },

          [`@media (min-width: ${screens['2xl'].min})`]: {
            maxWidth: '1320px',
          },
        },
      })
    }),
  ],
})

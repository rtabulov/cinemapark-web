import { createI18n } from 'vue-i18n'

// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
const messages = Object.fromEntries(
  Object.entries(import.meta.globEager('../../locales/*.json')).map(
    ([key, value]) => {
      return [key.slice(14, -5), value.default]
    },
  ),
)

export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'en',
  messages,
})

import { TranslatedString } from '~/types/Translated'

export function translateSting(ts: TranslatedString) {
  const { locale } = useI18n()
  const loc = locale.value as 'ru' | 'en'
  return ts[loc] || `[no '${loc}' translation]`
}

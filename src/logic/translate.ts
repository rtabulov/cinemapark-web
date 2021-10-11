import { TranslatedString } from '~/types/Translated'

export function translateSting(ts: TranslatedString) {
  // const KEY = 'some-uniq-key'

  // const messages = Object.fromEntries(
  //   Object.entries(ts).map(([loc, v]) => [loc, { [KEY]: v }]),
  // )

  // console.log(messages)

  // const { t } = useI18n({ messages })

  // return t(KEY, messages)

  const { locale } = useI18n()

  return ts[locale.value as 'ru' | 'en']
}

import { NameTranslated, TranslatedString } from './Translated'

export type Movie = {
  name: TranslatedString
  actors: NameTranslated[]
  countries: string[]
  desc: TranslatedString
  directors: NameTranslated[]
  genres: NameTranslated[]
  poster: string
  rating: string
  releaseDate: string
  runtime: number
  slug: string
  trailer: string
  _id: string
}

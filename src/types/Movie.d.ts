import { NameTranslated, TranslatedString } from './Translated'
import { CountryCode } from '~/utils/countries'
import { Rating } from '~/utils/ratings'

export type Movie = {
  name: TranslatedString
  actors: NameTranslated[]
  countries: string[]
  desc: TranslatedString
  directors: NameTranslated[]
  genres: NameTranslated[]
  poster: string
  rating: Rating
  releaseDate: string
  runtime: number
  slug: string
  trailer: string
  _id: string
}

export class CreateMovieDto {
  name: TranslatedString
  poster: string
  trailer: string
  rating: Rating
  countries: CountryCode[]
  genres: { name: TranslatedString }[]
  desc: TranslatedString
  runtime: number
  directors: { name: TranslatedString }[]
  actors: { name: TranslatedString }[]
  releaseDate: Date
}

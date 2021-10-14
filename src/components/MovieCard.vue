<script lang="ts" setup>
import { translateSting } from '~/logic/translate'
import { NameTranslated, TranslatedString } from '~/types/Translated'
import { Rating, ratings } from '~/utils/ratings'

defineProps<{
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
}>()

const ratingColors: Record<`${typeof ratings[number]}` | 'default', string> = {
  G: 'bg-green-400',
  'NC-17': 'bg-green-400',
  PG: 'bg-green-400',
  'PG-13': 'bg-yellow-400',
  R: 'bg-orange-400',
  default: 'bg-green-400',
}
</script>

<template>
  <div>
    <div style="padding-bottom: 125%" class="relative">
      <img
        :src="poster"
        :alt="name.en"
        class="absolute h-full w-full object-cover object-center"
      />
    </div>
    <h2 class="font-semibold text-lg mt-4">
      {{ name.en }}
    </h2>

    <div class="flex items-center justify-between mt-2">
      <div class="text-sm">
        {{ genres.map((g) => translateSting(g.name)).join(', ') }}
      </div>

      <div
        class="text-xxs flex-shrink-0 w-11 h-11 diamond transform relative"
        :class="ratingColors[rating || 'default']"
      >
        <span
          class="
            absolute
            z-1
            left-1/2
            top-1/2
            transform
            -translate-x-1/2 -translate-y-1/2
            text-dark-50
            font-bold
            whitespace-nowrap
          "
        >
          {{ rating }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$size: 1.3rem;

.diamond {
  clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
}
</style>

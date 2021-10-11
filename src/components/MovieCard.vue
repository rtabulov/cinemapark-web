<script lang="ts" setup>
import { NameTranslated, TranslatedString } from '~/types/Translated'

defineProps<{
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
}>()
</script>

<template>
  <div>
    <img :src="poster" :alt="name.en" class="w-full" />
    <h2 class="font-semibold text-lg mt-4">
      {{ name.en }}
    </h2>

    <div class="flex items-center mt-2">
      <div class="text-sm">
        {{ genres.map(g => g.name.en).join(', ') }}
      </div>

      <div class="text-xxs flex-shrink-0 w-11 h-11 diamond transform relative">
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

.diamond:after {
  content: '';
  position: absolute;
  inset: 0;
  background-color: rgb(221, 162, 0);
  clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
}
</style>

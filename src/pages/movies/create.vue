<script lang="ts" setup>
import { createMovie } from '~/api'
import { CreateMovieDto } from '~/types/Movie'
import MultiInput from '~/components/MultiInput.vue'
import { prettyDate } from '~/utils'
import { TranslatedString } from '~/types/Translated'

useTitle('Create a movie')

const { locale } = useI18n()

const form = reactive<CreateMovieDto>({
  name: { en: '', ru: '' },
  desc: { en: '', ru: '' },
  releaseDate: new Date(),
  genres: [],
  runtime: 0,
  poster: '',
  trailer: '',
  actors: [],
  countries: [],
  directors: [],
  rating: '',
})

const prettyReleaseDate = computed(() => prettyDate(form.releaseDate))

// TODO make multi input multi locale????
const genres = ref<TranslatedString[]>([
  { en: 'action', ru: 'экшн' },
  { en: 'thriller', ru: 'триллер' },
])
watch(
  genres,
  () =>
    (form.genres = genres.value.map((el) => ({
      ...form.genres,
      name: { [locale.value]: el },
    }))),
  { immediate: true, deep: true },
)

function onSubmit() {
  createMovie(form)
}
</script>

<template>
  <h1 class="text-2xl mb-8">Create a movie</h1>

  <form class="space-y-2" @submit.prevent="onSubmit">
    <label class="block text-lg !my-4">Title</label>
    <div class="space-x-4">
      <AppInput id="name_en" v-model="form.name.en" required type="text" />
      <label for="name_en">en</label>

      <span>|</span>

      <label for="name_ru">ru</label>
      <AppInput id="name_ru" v-model="form.name.ru" required type="text" />
    </div>

    <label class="block text-lg !my-4">Description</label>
    <div class="space-x-4">
      <AppInput id="desc_en" v-model="form.desc.en" required type="text" />
      <label for="desc_en">en</label>

      <span>|</span>

      <label for="desc_ru">ru</label>
      <AppInput id="desc_ru" v-model="form.desc.ru" required type="text" />
    </div>

    <label class="block text-lg !my-4" for="release_date">Release date</label>
    <AppInput
      id="release_date"
      :value="prettyReleaseDate"
      required
      type="date"
      @input="form.releaseDate = new Date($event.target.value)"
    />

    <label class="block text-lg !my-4" for="genres">Genres</label>
    <MultiInput id="genres" v-model="genres" required />
  </form>
</template>

<script lang="ts" setup>
import { CreateMovieDto } from '~/types/Movie'
import { prettyDate } from '~/utils'
import { TranslatedString } from '~/types/Translated'
import { countries } from '~/utils/countries'
import { ratings } from '~/utils/ratings'
import { useMovieStore } from '~/stores/movieStore'

useTitle('Create a movie')

const form = reactive<CreateMovieDto>({
  name: { en: '', ru: '' },
  desc: { en: '', ru: '' },
  releaseDate: new Date(),
  genres: [],
  runtime: 0,
  poster: '',
  trailer: '',
  actors: [],
  countries: ['US'],
  directors: [],
  rating: 'PG',
})

const prettyReleaseDate = computed(() => prettyDate(form.releaseDate))

const genresInterface = computed<TranslatedString[]>({
  get: () => form.genres.map((el) => el.name),
  set: (val) => {
    form.genres = val.map((el) => ({ name: el }))
  },
})

const actorsInterface = computed<TranslatedString[]>({
  get: () => form.actors.map((el) => el.name),
  set: (val) => {
    form.actors = val.map((el) => ({ name: el }))
  },
})

const directorsInterface = computed<TranslatedString[]>({
  get: () => form.directors.map((el) => el.name),
  set: (val) => {
    form.directors = val.map((el) => ({ name: el }))
  },
})

const movieStore = useMovieStore()
const router = useRouter()

async function onSubmit() {
  await movieStore.create(form)
  router.push({ name: 'Movies' })
}
</script>

<template>
  <div class="container">
    <h1 class="text-2xl mb-8">Create a movie</h1>

    <form class="space-y-2" @submit.prevent="onSubmit">
      <label class="block text-lg !my-4">Title</label>
      <div class="space-x-4">
        <AppInput id="name_en" v-model="form.name.en" required type="text" />
        <label for="name_en">en</label>

        <span>|</span>

        <label for="name_ru">ru</label>
        <AppInput id="name_ru" v-model="form.name.ru" type="text" />
      </div>

      <label class="block text-lg !my-4">Description</label>
      <div class="space-x-4">
        <AppInput id="desc_en" v-model="form.desc.en" required type="text" />
        <label for="desc_en">en</label>

        <span>|</span>

        <label for="desc_ru">ru</label>
        <AppInput id="desc_ru" v-model="form.desc.ru" type="text" />
      </div>

      <label class="block text-lg !my-4" for="release_date">Release date</label>
      <AppInput
        id="release_date"
        :value="prettyReleaseDate"
        required
        type="date"
        @input="form.releaseDate = new Date($event.target.value)"
      />

      <div>
        <label class="block text-lg !my-4" for="genres">Genres</label>
        <MultiInputTranslated id="genres" v-model="genresInterface" />
      </div>

      <div>
        <label class="block text-lg !my-4" for="runtime">
          Runtime (minutes)
        </label>
        <AppInput
          id="runtime"
          v-model.number="form.runtime"
          type="number"
          min="0"
          max="999"
          required
        />
      </div>

      <div>
        <label class="block text-lg !my-4" for="poster"> Poster URL </label>
        <AppInput id="poster" v-model.number="form.poster" required />
      </div>

      <div>
        <label class="block text-lg !my-4" for="trailer"> Trailer URL </label>
        <AppInput id="trailer" v-model.number="form.trailer" />
      </div>

      <div>
        <label class="block text-lg !my-4" for="actors">Actors</label>
        <MultiInputTranslated id="actors" v-model="actorsInterface" />
      </div>

      <div>
        <label class="block text-lg !my-4" for="countries">Countries</label>
        <OptionsMultiInput
          id="countries"
          v-model="form.countries"
          :options="countries"
          search-field="name"
          label-field="name"
          value-field="code"
        />
      </div>

      <div>
        <label class="block text-lg !my-4" for="directors">Directors</label>
        <MultiInputTranslated id="directors" v-model="directorsInterface" />
      </div>

      <div>
        <label class="block text-lg !my-4" for="rating">Rating</label>
        <OptionsInput
          id="rating"
          v-model="form.rating"
          :options="ratings"
          required
        />
      </div>

      <div class="!mt-4">
        <button class="btn" type="submit">{{ $t('create') }}</button>
      </div>
    </form>
  </div>
</template>

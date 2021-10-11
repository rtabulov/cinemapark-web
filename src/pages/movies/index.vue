<route>
{
  name: "Movies"
}
</route>

<script setup lang="ts">
import { useMovieStore } from '~/stores/movies'

const movieStore = useMovieStore()

movieStore.fetchMovies()
</script>

<template>
  <div class="container mx-auto">
    <h1 class="text-2xl mb-8">Now in theaters</h1>

    <div class="grid grid-cols-6 gap-4">
      <div
        v-for="movie in movieStore.movies"
        :key="movie._id"
        class="col-span-1"
      >
        <MovieCard v-bind="movie" />
      </div>
    </div>
  </div>
</template>

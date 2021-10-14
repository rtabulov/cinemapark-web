<route>
{
  name: "Movies"
}
</route>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMovieStore } from '~/stores/movies'

const movieStore = useMovieStore()

const { movies } = storeToRefs(movieStore)

movieStore.fetchMovies()
</script>

<template>
  <div class="container">
    <h1 class="text-2xl mb-8">Now in theaters</h1>

    <transition mode="out-in" name="fade">
      <div v-if="movieStore.loading">Loading...</div>

      <div v-else-if="!movieStore.error" class="grid grid-cols-6 gap-4">
        <div v-for="movie in movies" :key="movie._id" class="col-span-1">
          <MovieCard v-bind="movie" />
        </div>
      </div>

      <div v-else>
        {{ movieStore.error.toJSON() }}
      </div>
    </transition>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

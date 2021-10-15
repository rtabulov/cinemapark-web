<route>
{
  name: "Movies"
}
</route>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ConfirmModalVue from '~/components/ConfirmModal.vue'
import { useMovieStore } from '~/stores/movieStore'

const movieStore = useMovieStore()

const { movies } = storeToRefs(movieStore)

movieStore.fetchMovies()

const confirmModal = ref<InstanceType<typeof ConfirmModalVue> | null>(null)

async function removeMovie(id: string) {
  const ok = await confirmModal.value?.confirmation()

  if (ok) await movieStore.remove(id)
}
</script>

<template>
  <div class="container">
    <ConfirmModal ref="confirmModal" />

    <h1 class="text-2xl mb-8">Now in theaters</h1>

    <transition mode="out-in" name="fade">
      <div v-if="movieStore.loading">Loading...</div>

      <div v-else-if="!movieStore.error" class="grid grid-cols-6 gap-4">
        <div v-for="movie in movies" :key="movie._id" class="col-span-1">
          <MovieCard
            class="h-full"
            admin
            v-bind="movie"
            @remove="removeMovie"
          />
        </div>
      </div>

      <div v-else>
        <h2 class="text-xl mb-4">Something went wrong</h2>
        <h3 class="text-lg">
          <code>
            {{ movieStore.error.response?.status }}
            {{ movieStore.error.response?.data }}
            {{ movieStore.error.message }}
          </code>
        </h3>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

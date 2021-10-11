import { acceptHMRUpdate, defineStore } from 'pinia'
import { getMovies } from '~/api'
import { Movie } from '~/types/Movie'

export const useMovieStore = defineStore('user', {
  state: () => ({
    movies: [] as Movie[],
  }),

  actions: {
    async fetchMovies() {
      this.movies = await getMovies()
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMovieStore, import.meta.hot))

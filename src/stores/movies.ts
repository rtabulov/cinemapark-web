import { acceptHMRUpdate, defineStore } from 'pinia'
import { getMovies } from '~/api'
import { Movie } from '~/types/Movie'

export const useMovieStore = defineStore('user', {
  state: () => ({
    movies: [] as Movie[],
  }),

  actions: {
    fetchMovies(): Promise<Movie[]> {
      return this.useAsync(async () => {
        if (!this.movies.length) this.movies = await getMovies()
        return this.movies
      })
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMovieStore, import.meta.hot))

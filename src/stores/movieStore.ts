import { acceptHMRUpdate, defineStore } from 'pinia'
import { createMovie, getMovies } from '~/api'
import { CreateMovieDto, Movie } from '~/types/Movie'

export const useMovieStore = defineStore('user', {
  state: () => ({
    movies: [] as Movie[],
  }),

  actions: {
    fetchMovies(): Promise<Movie[]> {
      return this.useAsync(async () => {
        this.movies = await getMovies()
        return this.movies
      })
    },

    createMovie(movie: CreateMovieDto) {
      return this.useAsync(async () => {
        const createdMovie = await createMovie(movie)
        this.movies.push(createdMovie)
        return createdMovie
      })
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMovieStore, import.meta.hot))

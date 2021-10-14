import { acceptHMRUpdate, defineStore } from 'pinia'
import { createMovie, getMovies, removeMovie } from '~/api'
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

    create(movie: CreateMovieDto) {
      return this.useAsync(async () => {
        const createdMovie = await createMovie(movie)
        this.movies.push(createdMovie)
        return createdMovie
      })
    },

    remove(id: string) {
      return this.useAsync(async () => {
        const deletedMovie = await removeMovie(id)
        const idx = this.movies.findIndex((m) => m._id === id)
        this.movies.splice(idx, 1)
        return deletedMovie
      })
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMovieStore, import.meta.hot))

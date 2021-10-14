import axios from 'axios'
import { CreateMovieDto, Movie } from '~/types/Movie'

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 7000,
})

export async function getMovies() {
  const res = await api.get<Movie[]>('/movies')
  return res.data
}

export async function createMovie(movie: CreateMovieDto) {
  const res = await api.post('/movies', movie)
  return res.data
}

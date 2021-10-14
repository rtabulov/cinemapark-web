import axios, { AxiosResponse } from 'axios'
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
  const res = await api.post<CreateMovieDto, AxiosResponse<Movie>>(
    '/movies',
    movie,
  )
  return res.data
}

export async function removeMovie(id: string) {
  const res = await api.delete<Movie>(`/movies/${id}`)
  return res.data
}

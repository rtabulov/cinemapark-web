import axios from 'axios'
import { Movie } from '~/types/Movie'

export const api = axios.create({ baseURL: 'http://localhost:3000/api' })

export async function getMovies(): Promise<Movie[]> {
  const res = await api.get('/movies')
  return res.data
}

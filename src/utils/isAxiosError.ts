import { AxiosError } from 'axios'

export function isAxiosError(object: any): object is AxiosError {
  return 'config' in object && 'isAxiosError' in object && 'toJSON' in object
}

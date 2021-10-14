import { AxiosError } from 'axios'
import { isAxiosError } from '~/utils/isAxiosError'

export function asyncPlugin() {
  const loading = ref(false)
  const error = ref<null | AxiosError>(null)

  const toggleLoading = useToggle(loading)

  const useAsync = async <T>(fn: () => Promise<T>) => {
    toggleLoading(true)

    try {
      const res = await fn()
      error.value = null
      return res
    } catch (e) {
      if (isAxiosError(e)) error.value = e
      throw e
    } finally {
      toggleLoading(false)
    }
  }

  return { loading, error, useAsync, toggleLoading }
}

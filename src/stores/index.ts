import { createPinia } from 'pinia'
import { AxiosError } from 'axios'

export default createPinia().use(({ store }) => {
  const loading = ref<boolean>(false)
  const error = ref<null | AxiosError>(null)

  const toggleLoading = useToggle(loading)

  const useAsync = async <T>(fn: () => Promise<T>): Promise<T> => {
    toggleLoading(true)

    try {
      const res = await fn()
      error.value = null
      return res
    } catch (e) {
      error.value = e as AxiosError
      throw e
    } finally {
      toggleLoading(false)
    }
  }

  store.useAsync = useAsync
  store.loading = loading
  store.error = error
  store.toggleLoading = toggleLoading
  // return { loading, error, useAsync, toggleLoading }
})

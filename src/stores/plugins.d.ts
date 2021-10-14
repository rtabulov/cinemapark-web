import { Ref } from '@vue/reactivity'
import { AxiosError } from 'axios'
import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    set loading(value: Ref<boolean>)
    get loading(): boolean

    set error(value: Ref<AxiosError | null>)
    get error(): AxiosError | null

    useAsync: <T>(fn: () => Promise<T>) => Promise<T>
    toggleLoading: (value?: boolean | undefined) => boolean
  }
}

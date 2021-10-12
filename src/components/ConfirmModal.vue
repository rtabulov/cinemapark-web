<script lang="ts" setup>
import { newPromise } from '~/utils'

withDefaults(defineProps<{ action?: string }>(), {
  action: 'confirm',
})

const emit = defineEmits<{
  (e: 'confirmPromise', promise: Promise<unknown>): void
  (e: 'confirm'): void
  (e: 'fail'): void
}>()

let { promise, resolve } = newPromise<unknown>()
promise.then(() => emit('confirm'))
promise.catch((e) => {
  emit('fail')
  throw e
})

function bootstrap() {
  const obj = newPromise<unknown>()
  promise = obj.promise
  promise.then(() => emit('confirm'))
  promise.catch((e) => {
    emit('fail')
    throw e
  })
  resolve = obj.resolve

  emit('confirmPromise', promise)
}
</script>

<template>
  <AppModal @close="resolve(false)" @controls="bootstrap">
    <template #header>
      <slot name="header"></slot>
    </template>
    <template #default>
      <slot name="default" v-bind="{ promise, resolve }"></slot>
    </template>
    <template #footer="controls">
      <slot name="footer" v-bind="{ ...controls, promise, resolve }">
        <div class="flex space-x-2 justify-end">
          <button class="btn" @click="resolve(true), controls.close()">
            {{ action }}
          </button>
          <button
            class="btn bg-red-50 hover:bg-red-100 text-dark-500"
            @click="controls.close"
          >
            close
          </button>
        </div>
      </slot>
    </template>
  </AppModal>
</template>

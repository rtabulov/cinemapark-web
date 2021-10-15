<script lang="ts" setup>
import { newPromise } from '~/utils'

withDefaults(defineProps<{ action?: string }>(), {
  action: 'confirm',
})

// const emit = defineEmits<{
//   (e: 'confirmPromise', promise: Promise<unknown>): void
//   (e: 'confirm'): void
//   (e: 'fail'): void
// }>()

const { promise: p, resolve: r } = newPromise<boolean>()

const promise = ref(p)
const resolve = ref(r)

const open = ref(false)

function confirmation() {
  open.value = true

  const obj = newPromise<boolean>()

  promise.value = obj.promise
  resolve.value = obj.resolve

  return promise.value
}

defineExpose({ confirmation })
</script>

<template>
  <AppModal :open="open" @close="resolve(false), (open = false)">
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

<script lang="ts" setup>
withDefaults(defineProps<{ modelValue?: unknown; noRing?: boolean }>(), {
  noRing: false,
})
const emit = defineEmits<{
  (e: 'update:modelValue', val: unknown): void
}>()

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <input
    class="
      rounded-sm
      min-w-72
      bg-opacity-30 bg-gray-500
      px-3
      py-1
      transition
      outline-none
    "
    :class="{ 'ring-light-900 focus:ring-1': !noRing }"
    :value="modelValue"
    @input="onInput"
  />
</template>

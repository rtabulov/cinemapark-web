<script lang="ts" setup>
import TomSelect from 'tom-select'

defineProps<{
  modelValue: string | null
  options: readonly string[]
}>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const inp = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (inp.value) {
    // eslint-disable-next-line no-new
    new TomSelect(inp.value, {
      persist: false,
      create: false,
      // @ts-ignore
    })
  }
})

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <!-- todo uniq id -->
  <select
    id="tom-select-zxc"
    ref="inp"
    :value="modelValue"
    class="bg-transparent outline-none"
    @input="onInput"
  >
    <option v-for="item in options" :key="item" :value="item">
      {{ item }}
    </option>
  </select>
</template>

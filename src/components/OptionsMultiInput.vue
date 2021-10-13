<script lang="ts" setup>
import TomSelect from 'tom-select'

const props = defineProps<{
  modelValue: string[]
  options: readonly (string | unknown)[]
  searchField?: string | string[]
  valueField?: string
  labelField?: string
}>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string[]): void }>()

const modelValueString = computed(() => props.modelValue.join(','))

const inp = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (inp.value) {
    // eslint-disable-next-line no-new
    new TomSelect(inp.value, {
      persist: false,
      // @ts-ignore
      options: props.options,
      searchField:
        typeof props.searchField === 'string'
          ? [props.searchField]
          : props.searchField,
      valueField: props.valueField,
      labelField: props.labelField,
    })
  }
})

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value.split(','))
}
</script>

<template>
  <input
    id="tom-select"
    ref="inp"
    :value="modelValueString"
    class="bg-transparent outline-none"
    @input="onInput"
  />
</template>

<style lang="css">
.ts-control > input {
  background: transparent;
  flex-grow: 1;
  outline: none;
  font-size: inherit;
}

.ts-wrapper.focus .ts-control {
  @apply outline-none border-none ring-light-900 ring-1;
}

.ts-control .item {
  @apply px-2 flex items-center mb-0 min-h-8
  rounded-sm text-light-900 bg-green-500 space-x-1;
  &:not(:last-child) {
    @apply mr-1;
  }
}

.ts-control {
  display: flex;
  @apply bg-opacity-30 bg-gray-500 rounded-sm p-1 transition;
}

.ts-hidden-accessible {
  border: 0 !important;
  clip: rect(0 0 0 0) !important;
  -webkit-clip-path: inset(50%) !important;
  clip-path: inset(50%) !important;
  height: 1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important;
}

.ts-dropdown {
  @apply bg-dark-100;
}

.ts-dropdown .option {
  @apply px-3 py-1 cursor-pointer hover:bg-dark-200 transition-colors;
}

/*
 wrapperClass: 'ts-wrapper !text-base',
      itemClass:
        'ts-item !px-2 !flex items-center !mb-0 !rounded-sm !text-light-900 !bg-green-500 !space-x-1',
      controlClass:
        'ts-control !items-stretch !border-none !rounded-sm !bg-opacity-30 !bg-gray-500 !p-1',
*/
</style>

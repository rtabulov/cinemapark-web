<script lang="ts" setup>
import { uniq } from 'lodash-es'

const props = withDefaults(
  defineProps<{
    modelValue?: string[]
    uniq?: boolean
  }>(),
  {
    modelValue: () => [],
    uniq: true,
  },
)
const emit = defineEmits<{ (e: 'update:modelValue', val: string[]): void }>()

const val = ref('')

const items = ref(toRaw(props.modelValue))

watch(items, (val) => {
  emit('update:modelValue', val)
})

const focus = ref(false)

const input = ref<HTMLElement | null>(null)

// scroll to right
watch(
  items,
  () => input.value && (input.value.scrollLeft = input.value.scrollWidth),
  { deep: true },
)

function onInput(e: Event) {
  const { value } = e.target as HTMLInputElement

  val.value = value
}

function removeItem(item: string) {
  items.value.splice(items.value.indexOf(item), 1)
}

function addItem(item: string) {
  const newstr = item.trim()
  if (!newstr) return

  if (props.uniq) items.value = uniq([...items.value, newstr])
  else items.value = [...items.value, newstr]

  val.value = ''
}

function onDeletePress() {
  if (val.value.length || !items.value.length) return

  items.value.splice(items.value.length - 1, 1)
}
</script>

<template>
  <div
    ref="input"
    class="
      no-scrollbar
      max-w-169
      relative
      flex
      p-1
      rounded-sm
      transition
      ring-light-900
      bg-opacity-30 bg-gray-500
      overflow-x-auto
    "
    :class="{ 'ring-1': focus }"
  >
    <span class="left-0 space-x-1 flex z-1">
      <span
        v-for="item in items"
        :key="item"
        class="
          flex
          items-center
          px-2
          rounded-sm
          bg-green-500
          space-x-1
          h-full
          whitespace-nowrap
        "
      >
        <span>{{ item }}</span>
        <CarbonClose class="cursor-pointer" @click="removeItem(item)" />
      </span>
    </span>
    <AppInput
      no-ring
      class="w-full !bg-transparent"
      :value="val"
      type="text"
      @input="onInput"
      @focus="focus = true"
      @blur="focus = false"
      @keypress.enter.prevent="addItem(val)"
      @keydown.delete="onDeletePress()"
    />
  </div>
</template>

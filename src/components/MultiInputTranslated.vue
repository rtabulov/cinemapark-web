<script lang="ts" setup>
import { uniqBy } from 'lodash-es'
import { translateSting } from '~/logic/translate'
import type { TranslatedString } from '~/types/Translated'

const props = withDefaults(
  defineProps<{
    modelValue?: TranslatedString[]
    uniq?: boolean
    uniqField?: 'ru' | 'en'
  }>(),
  {
    modelValue: () => [],
    uniq: true,
    uniqField: 'en',
  },
)
const emit =
  defineEmits<{ (e: 'update:modelValue', val: TranslatedString[]): void }>()

const { locale } = useI18n()

const val = ref('')

const focus = ref(false)

const input = ref<HTMLElement | null>(null)

// scroll to right
watch(
  props.modelValue,
  () => input.value && (input.value.scrollLeft = input.value.scrollWidth),
  { deep: true },
)

const selectedGenre = ref<(TranslatedString & { idx: number }) | null>(null)

function onInput(e: Event) {
  const { value } = e.target as HTMLInputElement

  val.value = value
}

function removeItem(item: TranslatedString) {
  emit(
    'update:modelValue',
    [...props.modelValue].splice(props.modelValue.indexOf(item), 1),
  )
}

function addItem(item: string) {
  const newstr = item.trim()
  if (!newstr) return

  const newItem = { [locale.value]: newstr }

  if (props.uniq) {
    //
    emit(
      'update:modelValue',
      uniqBy([...props.modelValue, newItem], props.uniqField),
    )
  } else {
    emit('update:modelValue', [...props.modelValue, newItem])
  }

  val.value = ''
}

function onDeletePress() {
  if (val.value.length || !props.modelValue.length) return

  emit('update:modelValue', props.modelValue.slice(0, -1))
}

function updateTranslation() {
  if (!selectedGenre.value) return
  const { idx, ...translations } = selectedGenre.value
  // props.modelValue[idx] = translations

  const newArray = props.modelValue.slice()
  newArray[idx] = translations
  emit('update:modelValue', newArray)

  selectedGenre.value = null
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
    <ConfirmModal
      v-if="selectedGenre"
      :title="`translate '${modelValue[selectedGenre.idx].en}'`"
      @confirm="updateTranslation"
    >
      <template #default>
        <form action="#" class="space-y-4" @submit.prevent="updateTranslation">
          <div class="space-x-2">
            <label for="genre-en">en</label>
            <AppInput id="genre-en" v-model="selectedGenre.en" />
          </div>
          <div class="space-x-2">
            <label for="genre-ru">ru</label>
            <AppInput id="genre-ru" v-model="selectedGenre.ru" />
          </div>

          <input type="submit" class="hidden" />
        </form>
      </template>
    </ConfirmModal>

    <span class="left-0 space-x-1 flex z-1">
      <span
        v-for="(item, idx) in modelValue"
        :key="item.en"
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
        <span>{{ translateSting(item) }}</span>
        <CarbonTranslate
          class="cursor-pointer"
          @click="selectedGenre = { ...item, idx }"
        />
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

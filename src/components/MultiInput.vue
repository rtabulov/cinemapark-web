<script lang="ts" setup>
import { translateSting } from '~/logic/translate'
import { TranslatedString } from '~/types/Translated'

const { locale } = useI18n()

const val = ref('')

const props = withDefaults(defineProps<{ modelValue?: TranslatedString[] }>(), {
  modelValue: () => [],
})
const emit =
  defineEmits<{ (e: 'update:modelValue', val: TranslatedString[]): void }>()

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

const selectedGenre = ref<(TranslatedString & { idx: number }) | null>(null)

function onInput(e: Event) {
  const { value } = e.target as HTMLInputElement

  val.value = value
}

function removeItem(item: TranslatedString) {
  items.value.splice(items.value.indexOf(item), 1)
}

function addItem(item: string) {
  const newItem = item.trim().toLowerCase()
  if (!newItem) return

  items.value.push({ [locale.value]: newItem })
  val.value = ''
}

function onDeletePress() {
  if (val.value.length || !items.value.length) return

  items.value.splice(items.value.length - 1, 1)
}

function updateTranslation() {
  if (!selectedGenre.value) return
  const { idx, ...translations } = selectedGenre.value
  items.value[idx] = translations
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
      :title="`translate '${items[selectedGenre.idx].en}'`"
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
        </form>
      </template>
    </ConfirmModal>

    <span class="left-0 space-x-1 flex z-1">
      <span
        v-for="(item, idx) in items"
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

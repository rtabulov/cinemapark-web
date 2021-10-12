<script lang="ts" setup>
const props = withDefaults(
  defineProps<{ open?: boolean; title?: string; body?: string }>(),
  {
    open: true,
    title: '',
    body: '',
  },
)

const modalOpen = ref(toRaw(props).open)

type Controls = {
  close: () => void
  open: () => void
  toggle: () => void
}

const controls: Controls = {
  close: () => (modalOpen.value = false),
  open: () => (modalOpen.value = true),
  toggle: () => (modalOpen.value = !modalOpen.value),
}

const emit = defineEmits<{
  (e: 'controls', controls: Controls): void
  (e: 'open'): void
  (e: 'close'): void
}>()

emit('controls', controls)

watch(modalOpen, (open) => {
  if (open) {
    emit('open')
    document.body.classList.add('overflow-hidden')
    return
  }

  emit('close')
  document.body.classList.remove('overflow-hidden')
})
</script>

<template>
  <teleport to="#app">
    <!-- background -->
    <div
      v-if="modalOpen"
      class="
        inset-0
        fixed
        bg-opacity-95 bg-gray-700
        flex
        items-center
        justify-center
        z-100
      "
      @click="modalOpen = false"
    >
      <!-- modal -->
      <div
        class="
          absolute
          max-h-screen
          overflow-auto
          max-w-1/2
          min-w-80 min-h-10
          bg-dark-100
          text-light-700
          px-6
          py-4
          flex flex-col
          shadow-xl
          space-y-4
        "
        @click.stop
      >
        <!-- head -->
        <slot name="header" :title="title">
          <h2 v-if="title" class="text-xl">{{ title }}</h2>
        </slot>

        <!-- body -->
        <slot name="default">
          <p v-if="body" class="flex-grow">{{ body }}</p>
        </slot>

        <!-- footer -->
        <div class="mt-auto">
          <slot name="footer" v-bind="controls">
            <div>Footer</div>
          </slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

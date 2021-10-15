<script lang="ts" setup>
const props = withDefaults(
  defineProps<{ open?: boolean; title?: string; body?: string }>(),
  {
    open: true,
    title: '',
    body: '',
  },
)

type Controls = {
  close: () => void
  open: () => void
  toggle: () => void
}

const emit = defineEmits<{
  (e: 'controls', controls: Controls): void
  (e: 'open'): void
  (e: 'close'): void
}>()

const controls: Controls = {
  close: () => emit('close'),
  open: () => emit('open'),
  toggle: () => (props.open ? emit('close') : emit('open')),
}

emit('controls', controls)

watch(toRef(props, 'open'), (open) => {
  if (open) {
    document.body.classList.add('overflow-hidden')
    return
  }

  document.body.classList.remove('overflow-hidden')
})

onBeforeUnmount(() => document.body.classList.remove('overflow-hidden'))
</script>

<template>
  <teleport to="#app">
    <!-- background -->
    <div
      v-if="open"
      class="
        inset-0
        fixed
        bg-opacity-95 bg-gray-700
        flex
        items-center
        justify-center
        z-100
      "
      @click="emit('close')"
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

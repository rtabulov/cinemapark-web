<script lang="ts" setup>
const { locale } = useI18n()
const availableLocales = ['en', 'ru']
</script>

<template>
  <span class="space-x-4 text-base font-mono">
    <button
      v-for="loc in availableLocales"
      :key="loc"
      class="transition-colors"
      :class="locale === loc && 'text-green-300'"
      @click="locale = loc"
    >
      {{ loc }}
    </button>
  </span>
</template>

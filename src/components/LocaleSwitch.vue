<script lang="ts" setup>
const { locale } = useI18n()
</script>

<template>
  <span class="space-x-4 text-base font-mono">
    <button @click="locale = 'ru'">ru</button>
    <button @click="locale = 'en'">en</button>
  </span>
</template>

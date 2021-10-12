<script lang="ts" setup>
useTitle('Cinemapark')
const { locale } = useI18n()
watch(locale, () => {
  document.documentElement.setAttribute('lang', locale.value)
})
</script>

<template>
  <main class="py-10 text-gray-700 dark:text-gray-200">
    <RouterView />
    <Footer />
  </main>
</template>

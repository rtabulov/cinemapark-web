<script lang="ts" setup>
useTitle('Cinemapark')
const { locale } = useI18n()

useDark().value = true

watch(locale, () => {
  document.documentElement.setAttribute('lang', locale.value)
})
</script>

<template>
  <TheNavbar />
  <main class="py-10 text-gray-700 dark:text-gray-200">
    <RouterView v-slot="{ Component, route }">
      <template v-if="Component">
        <KeepAlive>
          <component :is="Component" :key="route.path"></component>
        </KeepAlive>
      </template>
    </RouterView>
    <TheFooter />
  </main>
</template>

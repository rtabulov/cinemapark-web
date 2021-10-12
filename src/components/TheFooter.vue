<script setup lang="ts">
import { isDark, toggleDark } from '~/logic'
</script>

<template>
  <nav class="text-xl mt-6 flex items-center justify-center space-x-4">
    <button class="icon-btn !outline-none" @click="toggleDark">
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </button>

    <a
      class="icon-btn"
      rel="noreferrer"
      href="https://github.com"
      target="_blank"
      title="GitHub"
    >
      <carbon-logo-github />
    </a>

    <LocaleSwitch class="align-middle" />
  </nav>
</template>

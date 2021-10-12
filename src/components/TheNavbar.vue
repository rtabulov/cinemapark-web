<template>
  <nav class="bg-dark-200 border-b-1 border-b-dark-100 shadow-lg">
    <div class="container text-gray-700 dark:text-gray-400 py-4">
      <div class="flex space-x-4 justify-center">
        <RouterLink to="/" active-class="text-gray-200">Home</RouterLink>
        <RouterLink to="/movies" active-class="text-gray-200">
          Movies
        </RouterLink>
        <RouterLink to="/movies/create" active-class="text-gray-200">
          Create a movie
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

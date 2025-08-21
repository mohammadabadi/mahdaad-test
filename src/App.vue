<template>
  <div class="flex flex-col bg-gray-50 h-dvh md:min-h-screen">
    <header class="h-14 shrink-0 bg-white border-b px-4 flex flex-row items-center justify-between text-gray-700">
      Header
    </header>
    <main class="flex-1 overflow-y-auto overscroll-contain px-4 py-3">
      <div class="max-w-3xl mx-auto space-y-4">
        <h2 class="text-xl font-bold text-gray-600">
          Content with Scroll
        </h2>
        <div class="space-y-3">
          <div class="p-3 bg-white border rounded text-gray-700" v-for="i in 50" :key="i">
            Row #{{ i }} - Test Scroll item
          </div>
        </div>
      </div>
    </main>
    <footer class="shirink-0 h-14 bg-white border-t text-gray-700 px-2 flex items-center justify-between">
      Footer
    </footer>
  </div>
</template>

<script setup>

</script>

<style>

</style>
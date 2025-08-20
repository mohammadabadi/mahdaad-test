<template>
  <div class="py-4">
    <h2 class="font-bold text-2xl mb-4"> Financial Dashboard</h2>
    <button @click="fetch" class="bg-blue-500 text-white px-4 py-2 rounded mb-4"> Fetch New</button>
    <div v-if="loading"> loading ... </div>
    <div v-if="errorMessage" class="text-red-500 py-2 px-3"> {{ errorMessage }}</div>
    <ul v-if="items.length">
      <li v-for="item in items" :key="item.id">
        {{ item.name }} {{ item.price }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import api from './stores/api'

const items = ref([])
const errorMessage = ref('')
const loading = ref(false)

async function fetch() {
  loading.value = true
  errorMessage.value = ''
  try {
    const res = await api.get("/stock")
    items.value = res.data
  } catch (error) {
    errorMessage.value = error.message
  } finally{
    loading.value = false
  }
}
</script>

<style>

</style>
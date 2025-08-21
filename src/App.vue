<template>
  <div class="py-4">
    <h2 class="text-2xl font-bold mb-4"> User Dashboard</h2>
    <input v-model="userId" type="number" placeholder="Enter User ID ..." class="border p-2 rounded w-full mb-4">
    <div class="text-gray-500" v-if="loading"> loading user data ... </div>
    <div class="text-red-500" v-else-if="error"> {{  error }}</div>
    <div class="border p-4 rounded bg-gray-50" v-else-if="userData">
      <h3 class="text-xl font-semibold"> User #{{ userId }}</h3>
      <p><strong>name : </strong> {{ userData.name }}</p>
      <p><strong>email : </strong> {{ userData.email }}</p>
    </div>
  </div>
</template>

<script setup>
import {ref,watch} from 'vue'

const userId = ref('')
const userData = ref(null)
const loading = ref(false)
const error = ref(null)

const cache = new Map()
let currentController = null 
watch (userId, async (newId) => {
  if(!newId){
    userData.value = null
    return
  }
  if(cache.has(newId)){
    userData.value = cache.get(newId)
    return
  }
  if(currentController){
    currentController.abort()
  }
  currentController = new AbortController();
  loading.value = true
  error.value = null
  userData.value = null

  try {
    const res = await fetch(`https/jsonplaceholder.typicode.com/users/${newId}`,
      {signal: currentController.signal}
    )
    if(!res.ok) throw new Error('user not found')
    const data = await res.json()

    cache.set(newId,data)
    userData.value = data
  } catch (err) {
      if(err.name !== 'AbortError') {
        error.value = err.message
      }
  }finally{
    loading.value = false
  }
})
</script>

<style>

</style>
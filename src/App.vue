<template>
  <div class="py-4 space-y-6">
    <h1 class="text-2xl font-bold">E-commerce App</h1>
    <div class="flex items-center">
      <span class="font-semibold py-1">Select Customer : </span>
      <select name="customers" id="customers" v-model="selectCustomer" class="border px-3 py-2 rounded">
        <option v-for="c in customers" :key="c.id" :value="c.id">{{ c.name }} - {{ c.city }}</option>
      </select>
    </div>
    <h3 class="text-xl font-semibold py-2">Products : </h3>
    <div class="grid grid-cols-2 gap-2">
      <div class="border p-4 rounded" v-for="product in products" :key="product.id">
        <p class="pb-3">{{product.name}}</p>
        <button @click="card.addItem(product)" class="bg-blue-500 rounded py-2 px-3">Add To Card</button>
      </div>
    </div>
    <h3 class="text-xl font-semibold py-2">Cards : </h3>
    <ul>
      <li class="border-b py-2" v-for="item in card.items" :key="item.id">
        {{item.name}} - X{{ item.qty }}
        <button @click="card.removeItem(item.id)" class="bg-red-500 text-white">remove</button>
      </li>
    </ul>
    <p class="font-semibold py-2 border rounded px-3">Total : {{ card.totalItems }}</p>
    <h3 class="text-xl font-semibold py-2">Customer Analytics : </h3>
    <p>
      <strong>Purchases : </strong>
      {{ customerProducts.map(p => p.name).join(" | ") || "No Purchases" }}
    </p>
    <p>
      <strong>Top Category : </strong>
      {{costomerCategory || "Nope"}}
    </p>
    <p>
      <strong>Recommendation : </strong>
      {{recommendation.map(p => p.name).join(',') || 'no Recommended'}}
    </p>
  </div>
</template>

<script setup>
import {products,customers} from './data/sampleData';
import {useCardStore} from './stores/card';
import {ref,computed,watch} from 'vue'
import {getProductByCustomer,getTopCategoryByCustomer,recommendProducts} from './utils/analytics'

const card = useCardStore()
const selectCustomer = ref(customers[0].id)

watch(
  selectCustomer,
  (newId) => {
    card.setCustomer(newId)
  },
  {immediate:true}
)
const customerProducts = computed (() =>
  getProductByCustomer(selectCustomer.value,card.items)
)
const costomerCategory = computed (() => 
  getTopCategoryByCustomer(selectCustomer.value,card.items)
)
const recommendation = computed (() => 
  recommendProducts(selectCustomer.value,card.items)
)

</script>

<style>

</style>
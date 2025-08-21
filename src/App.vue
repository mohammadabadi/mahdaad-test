<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">User Activity Logs</h2>

    <RecycleScroller
      class="scroller border h-[500px] overflow-auto"
      :items="logs"
      :item-size="40"
      key-field="id"
    >
      <template #default="{item,index}">
        <div class="p-2 border-b" :style="{minHeight:index % 5 === 0 ? '60px' : '40px'}">
          {{ item.id }} - {{ item.message }}
        </div>
      </template>
    </RecycleScroller>
  </div>
</template>

<script setup>
import { RecycleScroller } from 'vue3-virtual-scroller'
import {ref} from 'vue';

const logs = ref(
  Array.from({length:10000},(_,i) => ({
    id:i+1,
    message:`log entry #${i+1} - ${Math.random().toString(36).substring(2,15)}`
  }))
)
</script>

<style>

</style>
<template>
  <div class="p-4 space-y-4">
    <!-- theme Changer -->
    <div class="flex items-center gap-2">
      <span class="font-semibold text-gray-700 dark:text-white"> Theme :</span>
      <button @click="theme = 'light'" class="px-3 py-1 rounded bg-gray-700">
        Light
      </button>
      <button @click="theme = 'dark'" class="px-3 py-1 rounded bg-gray-700">
        Dark
      </button>
    </div>
    <!-- font size Changer -->
    <div class="flex items-center gap-2">
      <span class="font-semibold text-gray-700 dark:text-white"> Font Size :</span>
      <button @click="fontSize = 'small'" class="px-3 py-1 rounded bg-gray-700">
        small
      </button>
      <button @click="fontSize = 'medium'" class="px-3 py-1 rounded bg-gray-700">
        medium
      </button>
      <button @click="fontSize = 'large'" class="px-3 py-1 rounded bg-gray-700">
        large
      </button>
    </div>
  </div>
</template>

<script setup>
  import {ref,watch,onMounted} from "vue";

  const theme = ref("light")
  const fontSize = ref("medium")

  const Storage = "user-preferences"

  onMounted(()=>{
    const saved = localStorage.getItem(Storage)
    if(saved){
      const parsed = JSON.parse(saved);
      theme.value = parsed.theme || "light"
      fontSize.value = parsed.fontSize || "medium";
      applyPreferences()
    }
  });
  watch ([theme,fontSize], () => {
    localStorage.setItem(Storage,JSON.stringify({theme:theme.value,fontSize:fontSize.value}))
    applyPreferences()
  })
  function applyPreferences(){
    document.documentElement.classList.toggle("dark",theme.value === "dark")
    document.documentElement.style.fontSize = fontSize.value === "small" ? "13px" : fontSize.value === "large" ? "22px" : "16px"
  }
</script>

<style>
html.dark{
  background-color: #333333;
  color:#ffffff;
}
</style>
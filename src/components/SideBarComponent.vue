<script setup lang="ts">
import router from '@/router'
</script>
<template>
  <div class="h-screen w-64 bg-gray-800 text-white flex flex-col p-4 space-y-4">
    <h2 class="text-2xl font-bold mb-6 text-center">Kelvin Technical Test Katekima Front End</h2>
    <nav class="flex flex-col space-y-2">
      <a href="#" class="hover:bg-gray-700 rounded px-3 py-2" @click="() => router.push('/poke')">Poke</a>
      <a href="#" class="hover:bg-gray-700 rounded px-3 py-2" @click="() => router.push('/store')">Store</a>
    </nav>
  </div>
</template>

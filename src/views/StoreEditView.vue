<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
const route = useRoute()
const id = route.params.id

const isFetching = ref(true)
const form = ref({
  title: '',
  price: '',
  description: '',
  category: '',
  image: '',
})
onMounted(async () => {
  if (id) {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`)
    const data = await res.json()
    form.value = {
      title: data.title,
      price: data.price.toString(),
      description: data.description,
      category: data.category,
      image: data.image,
    }
    isFetching.value = false
  }
})
const handleSubmit = async () => {
  const url = `https://fakestoreapi.com/products/${id}`
  const method = 'PUT'
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: form.value.title,
      price: parseFloat(form.value.price),
      description: form.value.description,
      category: form.value.category,
      image: form.value.image,
    }),
  })
  const result = await response.json()
  console.log("Result", result)
  router.push('/store')
}
</script>
<template>
  <main class="flex-1 flex flex-col gap-4">
    <h1 class="text-3xl font-bold text-gray-800">Store Product Edit (ID: {{ id }})</h1>
    <div v-if="isFetching" class="flex-1 flex flex-col">
      <div class="animate-pulse space-y-4 p-4">
        <div class="h-4 bg-gray-300 rounded w-3/4"></div>
        <div class="h-4 bg-gray-300 rounded w-5/6"></div>
        <div class="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
      <span class="ml-2 text-gray-500 text-center w-full">Loading Data</span>
    </div>
    <div v-else class="min-w-full text-sm text-left text-gray-600">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block mb-1 font-medium">Title</label>
          <input v-model="form.title" type="text" class="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label class="block mb-1 font-medium">Price</label>
          <input v-model="form.price" type="text" class="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label class="block mb-1 font-medium">Description</label>
          <input v-model="form.description" type="text" class="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label class="block mb-1 font-medium">Category</label>
          <input v-model="form.category" type="text" class="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label class="block mb-1 font-medium">Image (URL)</label>
          <input v-model="form.image" type="text" class="w-full border rounded px-3 py-2" required />
        </div>
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Update
        </button>
      </form>
    </div>
  </main>
</template>

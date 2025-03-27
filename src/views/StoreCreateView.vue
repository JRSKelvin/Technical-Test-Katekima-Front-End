<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import router from '@/router'
const { t } = useI18n()

const form = ref({
  title: '',
  price: '',
  description: '',
  category: '',
  image: '',
})
const handleSubmit = async () => {
  const url = `https://fakestoreapi.com/products/`
  const method = 'POST'
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
  console.log('Result', result)
  router.push('/store')
}
</script>
<template>
  <main class="flex-1 flex flex-col gap-4">
    <h1 class="text-3xl font-bold text-gray-800">Store Product Create</h1>
    <div class="min-w-full text-sm text-left text-gray-600">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block mb-1 font-medium">{{ t('title') }}</label>
          <input v-model="form.title" type="text" class="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label class="block mb-1 font-medium">{{ t('price') }}</label>
          <input v-model="form.price" type="text" class="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label class="block mb-1 font-medium">{{ t('description') }}</label>
          <input v-model="form.description" type="text" class="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label class="block mb-1 font-medium">{{ t('category') }}</label>
          <input v-model="form.category" type="text" class="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label class="block mb-1 font-medium">{{ t('image') }} ({{ t('url') }})</label>
          <input v-model="form.image" type="text" class="w-full border rounded px-3 py-2" required />
        </div>
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create
        </button>
      </form>
    </div>
  </main>
</template>

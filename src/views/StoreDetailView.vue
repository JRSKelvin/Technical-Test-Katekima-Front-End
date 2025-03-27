<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
const { t } = useI18n()
const route = useRoute()
const id = route.params.id

const data = ref()
const { isFetching, data: dataQuery } = useQuery({
  queryKey: ['productDetail'],
  queryFn: async () => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
    const data = await response.json()
    return data
  },
})
onMounted(() => {
  data.value = dataQuery.value
})
watch(dataQuery, (newValue) => {
  data.value = newValue
})
</script>
<template>
  <main class="flex-1 flex flex-col gap-4">
    <h1 class="text-3xl font-bold text-gray-800">Store Product Detail (ID: {{ id }})</h1>
    <div v-if="isFetching" class="flex-1 flex flex-col">
      <div class="animate-pulse space-y-4 p-4">
        <div class="h-4 bg-gray-300 rounded w-3/4"></div>
        <div class="h-4 bg-gray-300 rounded w-5/6"></div>
        <div class="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
      <span class="ml-2 text-gray-500 text-center w-full">{{ t('loadingData') }}</span>
    </div>
    <table v-else class="min-w-full text-sm text-left text-gray-600">
      <thead class="bg-gray-100 text-gray-700 uppercase text-xs">
        <tr>
          <th scope="col" class="px-6 py-4 capitalize">{{ t('description') }}</th>
          <th scope="col" class="px-6 py-4 capitalize">{{ t('value') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b hover:bg-gray-50">
          <td class="px-6 py-4 capitalize">{{ t('name') }}</td>
          <td class="px-6 py-4 capitalize">{{ data?.title }}</td>
        </tr>
        <tr class="border-b hover:bg-gray-50">
          <td class="px-6 py-4 capitalize">{{ t('price') }}</td>
          <td class="px-6 py-4 capitalize">{{ data?.price }}</td>
        </tr>
        <tr class="border-b hover:bg-gray-50">
          <td class="px-6 py-4 capitalize">{{ t('description') }}</td>
          <td class="px-6 py-4 capitalize">{{ data?.description }}</td>
        </tr>
        <tr class="border-b hover:bg-gray-50">
          <td class="px-6 py-4 capitalize">{{ t('category') }}</td>
          <td class="px-6 py-4 capitalize">{{ data?.category }}</td>
        </tr>
        <tr class="border-b hover:bg-gray-50">
          <td class="px-6 py-4 capitalize">{{ t('rating') }}</td>
          <td class="px-6 py-4 capitalize">{{ data?.rating?.rate }}</td>
        </tr>
        <tr class="border-b hover:bg-gray-50">
          <td class="px-6 py-4 capitalize">{{ t('image') }}</td>
          <td class="px-6 py-4 capitalize">
            <img :src="data?.image || ''" />
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

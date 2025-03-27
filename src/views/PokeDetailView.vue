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
  queryKey: ['berryDetail'],
  queryFn: async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/berry/${id}`)
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
    <h1 class="text-3xl font-bold text-gray-800">Poke Berry Detail (ID: {{ id }})</h1>
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
          <td class="px-6 py-4 capitalize">{{ data?.name }}</td>
        </tr>
        <tr class="border-b hover:bg-gray-50">
          <td class="px-6 py-4 capitalize">{{ t('naturalGiftPower') }}</td>
          <td class="px-6 py-4 capitalize">{{ data?.natural_gift_power }}</td>
        </tr>
        <tr class="border-b hover:bg-gray-50">
          <td class="px-6 py-4 capitalize">{{ t('naturalGiftType') }}</td>
          <td class="px-6 py-4 capitalize">{{ data?.natural_gift_type?.name }}</td>
        </tr>
        <tr class="border-b hover:bg-gray-50">
          <td class="px-6 py-4 capitalize">{{ t('size') }}</td>
          <td class="px-6 py-4 capitalize">{{ data?.size }}</td>
        </tr>
        <tr class="border-b hover:bg-gray-50">
          <td class="px-6 py-4 capitalize">{{ t('smoothness') }}</td>
          <td class="px-6 py-4 capitalize">{{ data?.smoothness }}</td>
        </tr>
        <tr class="border-b hover:bg-gray-50">
          <td class="px-6 py-4 capitalize">{{ t('soilDryness') }}</td>
          <td class="px-6 py-4 capitalize">{{ data?.soil_dryness }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

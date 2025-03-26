<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import router from '@/router'
const data = ref([])
const totalDoc = ref(0)
const searchQuery = ref('')
const currentPage = ref(1)
const perPage = ref(10)
const totalPages = computed(() => Math.ceil(totalDoc.value / perPage.value))
const { isFetching, data: dataQuery } = useQuery({
  queryKey: ['berry', currentPage, perPage],
  queryFn: async () => {
    const params = new URLSearchParams({
      limit: localStorage.getItem('storePerPage') || perPage.value.toString(),
      offset: (perPage.value * (currentPage.value - 1)).toString(),
    })
    const response = await fetch(`https://fakestoreapi.com/products/?${params.toString()}`)
    const data = await response.json()
    console.log("data", data)
    totalDoc.value = 99999
    return data
  },
})
onMounted(() => {
  searchQuery.value = localStorage.getItem('storeSearchQuery') || ''
  currentPage.value = parseInt(localStorage.getItem('storeCurrentPage') || '1')
  perPage.value = parseInt(localStorage.getItem('storePerPage') || '10')
  data.value = dataQuery?.value
})
watch(dataQuery, (newValue) => {
  data.value = newValue?.filter((item: { name: string }) => searchQuery.value ? new RegExp(searchQuery.value, 'i').test(item.name) : true)
})
watch(searchQuery, (newValue) => {
  localStorage.setItem('storeSearchQuery', newValue)
  data.value = dataQuery?.value?.filter((item: { name: string }) => searchQuery.value ? new RegExp(searchQuery.value, 'i').test(item.name) : true)
})
watch(perPage, (newValue) => {
  localStorage.setItem('storePerPage', newValue.toString())
})
const pushToDetail = (id: string) => {
  router.push(`/store/detail/${id}`)
  localStorage.removeItem('storeSearchQuery')
  localStorage.removeItem('storeCurrentPage')
  localStorage.removeItem('storePerPage')
}
const handleCurrentPagePlus = () => {
  const newValue = currentPage.value + 1
  localStorage.setItem('storeCurrentPage', `${newValue}`)
  currentPage.value = newValue
}
const handleCurrentPageMinus = () => {
  const newValue = currentPage.value - 1
  localStorage.setItem('storeCurrentPage', `${newValue}`)
  currentPage.value = newValue
}
const handlePerPageChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  perPage.value = parseInt(target.value) || 10
  localStorage.setItem('storeCurrentPage', '1')
}
</script>
<script setup lang="ts"></script>
<template>
  <main class="flex-1 flex flex-col gap-4">
    <h1 class="text-3xl font-bold text-gray-800">Store Product</h1>
    <div class="mb-4">
      <input v-model="searchQuery" type="text" placeholder="Search" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" />
    </div>
    <div v-if="isFetching" class="flex-1 flex flex-col">
      <div class="animate-pulse space-y-4 p-4">
        <div class="h-4 bg-gray-300 rounded w-full"></div>
        <div class="h-4 bg-gray-300 rounded w-full"></div>
        <div class="h-4 bg-gray-300 rounded w-full"></div>
      </div>
      <span class="ml-2 text-gray-500 text-center w-full">Loading Data</span>
    </div>
    <table v-else class="min-w-full text-sm text-left text-gray-600">
      <thead class="bg-gray-100 text-gray-700 uppercase text-xs">
        <tr>
          <th scope="col" class="px-6 py-4">#</th>
          <th scope="col" class="px-6 py-4">Title</th>
          <th scope="col" class="px-6 py-4">Price</th>
          <th scope="col" class="px-6 py-4">Description</th>
          <th scope="col" class="px-6 py-4">Category</th>
          <th scope="col" class="px-6 py-4">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b hover:bg-gray-50" v-for="(item, index) in data as any" :key="item.id">
          <td class="px-6 py-4">{{ index + 1 }}</td>
          <td class="px-6 py-4">{{ item.title }}</td>
          <td class="px-6 py-4">{{ item.price }}</td>
          <td class="px-6 py-4">{{ item.description }}</td>
          <td class="px-6 py-4">{{ item.category }}</td>
          <td class="px-6 py-4">
            <button class="text-blue-600 hover:underline text-sm" @click="() => pushToDetail(item.id)">View</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-between items-center mt-4">
      <div class="text-sm text-gray-500 flex items-center space-x-2">
        <span>Rows per page:</span>
        <select v-model="perPage" class="border rounded px-2 py-1 text-sm focus:outline-none focus:ring focus:border-blue-300" @change="handlePerPageChange">
          <option :value="10">10</option>
          <option :value="30">30</option>
          <option :value="50">50</option>
        </select>
      </div>
      <div class="flex space-x-2">
        <button class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm" :disabled="currentPage === 1" @click="handleCurrentPageMinus">
          Prev
        </button>
        <button class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm" :disabled="true">
          {{ currentPage }}
        </button>
        <button class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm" :disabled="currentPage === totalPages" @click="handleCurrentPagePlus">
          Next
        </button>
      </div>
    </div>
  </main>
</template>

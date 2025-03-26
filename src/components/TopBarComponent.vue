<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLanguageStore } from '@/stores/languageStore.ts'
const { t } = useI18n()
const dropdownOpen = ref(false)
const languageStore = useLanguageStore()
const languages = [
  { code: 'en', label: 'English' },
  { code: 'id', label: 'Bahasa Indonesia' },
]
const selectedLangLabel = computed(() => {
  const found = languages.find((l) => l.code === languageStore.language)
  return found?.label || 'Language'
})
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}
const selectLanguage = (lang: { code: string; label: string }) => {
  languageStore.language = lang.code
  dropdownOpen.value = false
}
</script>
<template>
  <header class="bg-white shadow w-full h-16 flex items-center justify-between px-6">
    <h1 class="text-xl font-semibold text-gray-700">My Dashboard</h1>
    <div class="flex items-center space-x-4">
      <span class="text-gray-600">{{ t('welcome', { name: 'Kelvin' }) }}</span>
      <div class="relative">
        <button class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm flex items-center" @click="toggleDropdown">
          {{ selectedLangLabel }}
        </button>
        <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10">
          <button v-for="lang in languages" :key="lang.code" class="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm" @click="selectLanguage(lang)">
            {{ lang.label }}
          </button>
        </div>
      </div>
      <button class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm">Logout</button>
    </div>
  </header>
</template>

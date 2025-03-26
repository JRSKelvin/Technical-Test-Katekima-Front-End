import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { i18n } from '@/localization'

export const useLanguageStore = defineStore('language', () => {
  const language = ref('en')
  watch(language, (newLanguage) => {
    switch (newLanguage) {
      case 'en': {
        i18n.global.locale = 'en'
        break
      }
      case 'id': {
        i18n.global.locale = 'id'
        break
      }
      default: {
        i18n.global.locale = 'en'
        break
      }
    }
  })
  return { language }
})

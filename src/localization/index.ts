import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  locale: 'en',
  globalInjection: true,
  messages: {
    en: {
      welcome: 'Welcome Back, {name}',
    },
    id: {
      welcome: 'Selamat Datang, {name}',
    },
  },
})

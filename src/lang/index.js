import { createI18n } from 'vue-i18n'
import Cookies from 'js-cookie'
import enLocale from './en'
import zhLocale from './zh_CN'

const messages = {
  en: {
    ...enLocale
  },
  zh_CN: {
    ...zhLocale
  }
}

const i18n = createI18n({
  locale: Cookies.get('lang') || 'zh_CN', // set locale
  messages, // set locale messages
  globalInjection: true,
  legacy: false
})

export default i18n

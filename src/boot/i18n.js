import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'
import { useMainStore } from 'stores/MainStore'

const store = useMainStore()

export default boot(({ app }) => 
{
  const i18n = createI18n
  ({
    legacy: false,
    locale: store.Lang,
    globalInjection: true,
    fallbackLocale: ['es','en'],
    messages,
  })

  // Set i18n instance on app
  app.use(i18n)
})

<template>
  <div class="row justify-end">
    <q-select
      v-model="locale"
      :options="localeOptions"
      :label="$t('LanguageSwitcher.label')"
      dense
      emit-value
      map-options
      options-dense
      outlined
      :label-color="$q.dark.isActive ? 'white' : 'black'"
      style="width:120px;"
    />
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'
import { useMainStore } from 'stores/MainStore'
import { watch } from 'vue'

export default 
{
  setup () 
  {
    const { t } = useI18n()
    const { locale } = useI18n({ useScope: 'global' })

    const store = useMainStore()
    locale.value = store.Lang

    watch(locale, (newVal) => 
    {
      store.Lang = newVal
    })

    return {
      locale,
      localeOptions: 
      [
        { value: 'es', label: t('LanguageSwitcher.spanish') },
        { value: 'en', label: t('LanguageSwitcher.english') }
      ]
    }
  },

}
</script>
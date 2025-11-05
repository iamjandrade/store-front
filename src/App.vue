<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { setCssVar } from 'quasar'
import { Notify,LoadingBar} from 'quasar'

export default defineComponent
({
  name: 'App',
  mounted() 
  {
    setCssVar('primary','#0f172b')
    setCssVar('secondary','#b0bec5') 
    //'#f1f5f9'
    LoadingBar.setDefaults
    ({
      color: 'positive',
      position: 'top',
    })
  },
  
})
</script>

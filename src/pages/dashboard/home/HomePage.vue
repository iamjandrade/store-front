<template>
  <q-page class="q-pa-md">
    <Home></Home>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

import Home from '../../../components/dashboard/home/Home.vue'

export default defineComponent
({
  name: 'HomePage',
  components:
  {
    Home,
  },
  data: () => 
  ({
  }),  
  methods:
  {
  },
  mounted() 
  {
  },
  unmounted()
  {
  }
})
</script>

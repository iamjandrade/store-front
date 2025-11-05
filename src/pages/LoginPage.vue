<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-pa-md row items-center justify-center" style="min-height: 100vh;">
        <div class="col-12 col-md-3">
            <q-card flat class="q-mt-md q-pa-sm">
              <q-card-section :class="{'text-white': $q.dark.isActive}">
                <div class="text-h6 text-bold q-pb-md">{{$t('LoginContent.title')}} {{$t('app')}} </div>
                  <span  class="text-body">{{$t('LoginContent.description')}}</span>
              </q-card-section>
                <LoginContent></LoginContent>
            </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>

import LoginContent from 'src/components/login/LoginContent.vue';

export default 
{
  components: 
  {
    LoginContent,
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
}
</script>
<style scoped>

</style>
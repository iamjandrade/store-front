<template>
  <div class="fullscreen bg-white text-dark q-pa-md flex flex-center">
    <div class="column items-center text-center">
      <div class="text-weight-bold" style="font-size:16vh; line-height:1;">
        {{$t('ErrorNotFound.title')}}
      </div>

      <div class="text-h6 q-mt-md" style="opacity:.6; max-width:680px">
        {{$t('ErrorNotFound.msg')}}
      </div>

      <span class="text-body1" style="opacity:.6; max-width:680px">
        {{$t('ErrorNotFound.description')}}
      </span>

      <div class="row q-gutter-sm q-mt-xl">
        <q-btn
          outline
          color="dark"
          :label="$t('ErrorNotFound.goBack')"
          @click="$router.back()"
          no-caps
        />

        <q-btn
          color="dark"
          text-color="white"
          unelevated
          to="/"
          :label="$t('ErrorNotFound.backHome')"
          no-caps
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorNotFound'
})
</script>
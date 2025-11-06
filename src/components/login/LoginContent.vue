<template>
  <q-card-section class="row justify-center">
    <div class="col-12 col-md-12">
      <q-form method="post" @submit.prevent="Login()" class="q-gutter-xs">
        <q-input
          v-model="loginForm.email"
          type="email"
          dense
          outlined
          :label="$t('LoginContent.form.email')"
          :rules="[ val => !!val || $t('required')]"
        >
          <template v-slot:prepend>
            <q-icon name="las la-at" />
          </template>
        </q-input>

         <q-input
          v-model="loginForm.name"
          type="text"
          dense
          outlined
          :label="$t('LoginContent.form.name')"
          :rules="[ val => !!val || $t('required')]"
        >
          <template v-slot:prepend>
            <q-icon name="las la-user" />
          </template>
        </q-input>


        <div class="row justify-center">
          <q-btn 
            :label="$t('LoginContent.form.submit')" 
            class="full-width q-mt-md" 
            type="submit" 
            :color="$q && $q.dark && $q.dark.isActive ? 'white' : 'primary'"
            :text-color="$q && $q.dark && $q.dark.isActive ? 'dark' : 'white'"
            icon="login" 
            unelevated
            :loading="form.loading"/>
        </div>
      </q-form>
    </div>
  </q-card-section>    
</template>

<script>
import { Notify } from 'quasar'
import { useMainStore } from "stores/MainStore"

export default 
{
  components: 
  {
  },
  data: () => 
  ({
    loginForm:
    {
      email: 'test@example.com',
      name: '',
    },
    form: 
    {
      loading: false,
    },
  }),  

  methods:
  {
    Login() 
    {
      this.form.loading = true 
      const store = useMainStore()
      store.User = this.loginForm.email
      store.Name = this.loginForm.name
      store.Authenticated = true
      this.$router.push('/dashboard')

    },
  },
  mounted() 
  {
  },
}
</script>
<style scoped>

</style>
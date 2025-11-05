<template>
  <div class="q-mt-md" style="margin-top: auto;">
    <q-separator />
    <q-item dense clickable color="secondary" active-class="bg-secondary" class="q-mt-lg" aria-label="Sidebar profile" >
      <q-item-section avatar class="q-ma-none icon-section" >
        <q-avatar rounded size="md" class="bg-secondary text-primary">
          {{ initials }}
        </q-avatar>
      </q-item-section>
      <q-item-section   class="q-ma-none">
        <div class="text-subtitle2">{{ user.name }}</div>
        <div class="text-caption ellipsis">{{ user.email }}</div>
      </q-item-section>
      <q-item-section side style="min-width:40px">
        <q-btn dense flat round icon="unfold_more" @click.stop="profileMenu = !profileMenu" aria-label="Open profile menu" />
      </q-item-section>
      <q-menu v-model="profileMenu" :offset="[0, 5]" transition-show="fade" transition-hide="fade">
        <q-list style="min-width: 180px">
          <q-item clickable v-close-popup>
            <q-item-section avatar class="q-ma-none icon-section">
              <q-avatar rounded size="md" class="bg-secondary text-primary">
                  {{ initials }}
              </q-avatar>
            </q-item-section>
            <q-item-section   class="q-ma-none">
                <div class="text-subtitle2">{{ user.name }}</div>
                <div class="text-caption ellipsis">{{ user.email }}</div>
            </q-item-section>
          </q-item>
          <q-separator inset />
          <q-item dense clickable v-close-popup>
            <q-item-section avatar class="q-ma-none icon-section">
              <q-icon size="xs" outlined name="person" />
            </q-item-section>
            <q-item-section>Account</q-item-section>
          </q-item>
          <q-item dense clickable v-close-popup>
            <q-item-section avatar class="q-ma-none icon-section" >
              <q-icon size="xs" outlined name="credit_card" />
            </q-item-section>
            <q-item-section>Billing</q-item-section>
          </q-item>
          <q-item dense clickable v-close-popup>
            <q-item-section avatar class="q-ma-none icon-section">
              <q-icon size="xs" outlined name="notifications"/>
            </q-item-section>
            <q-item-section>Notifications</q-item-section>
          </q-item>
          <q-separator  inset />
          <q-item  clickable @click="Logout()">
            <q-item-section avatar class="q-ma-none icon-section">
              <q-icon size="xs" outlined name="logout" />
            </q-item-section>
            <q-item-section>{{ $t('MainLayout.menu.logout.title') }}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-item>
  </div>
</template>

<script>
import { useMainStore } from "stores/MainStore"
import { useHelpersBooking } from 'src/composables/helpers.js'

export default 
{
  data: () => 
  ({
    profileMenu: false
  }),  
  computed: 
  {
    user() 
    {
      const store = useMainStore()
      return { name: store.Name, email: store.User }
    },
    initials()
    {
      const store = useMainStore()
      const { Initials } = useHelpersBooking()
      return Initials(store.Name)
    }
  },
  methods: 
  {
    Logout()
    {
      this.$api.get('/logout').then((response) => 
      {
        if(response.data.success)
        {
          this.$q.notify({type:'positive',position:'bottom-right',message:response.data.msg})
          this.$q.localStorage.clear()
          this.$router.go(0)
        }

        if(!response.data.success)
        {
          this.$q.notify({type:'negative',position:'bottom-right',message:response.data.msg})
          this.$q.localStorage.clear()
          this.$router.go(0)
        }
      })
      .catch((e) => 
      {
        this.$q.notify({type:'negative',position:'bottom-right',message:this.$t('error')})
        this.$q.localStorage.clear()
        this.$router.go(0)
      })
    }
  },
  mounted()
  {
  },
}
</script>
<style scoped>
  .ellipsis 
  {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    max-width: 160px; /* reasonable default, adjusts to layout */
  }

</style>
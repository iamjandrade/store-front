<template>
  <q-layout view="lHh Lpr lFf">
    <q-header :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'" >
      <q-toolbar class="q-pa-lg">
        <q-btn
          flat
          dense
          icon="auto_awesome_mosaic"
          aria-label="Menu"
          size="sm"
          :class="$q.dark.isActive ? 'text-white' : 'text-primary'"
          @click="toggleLeftDrawer"
        />
       
        <q-toolbar-title>
        </q-toolbar-title>


        <div class="row items-center">
       
          <div class="row items-center no-wrap justify-end q-gutter-sm">
          
            <q-avatar rounded size="sm" class="bg-secondary text-primary">
              {{ initials }}
            </q-avatar>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawerModel"
      :mini="!leftDrawerOpen"
      show-if-above
      :behavior="drawerBehavior"  
      bordered
      :mini-width=80
    >
      <q-list class="q-pa-md">
        <q-item color="secondary" clickable class="q-pa-sm" aria-label="Sidebar header">
          <q-item-section avatar class="icon-section">
            <q-avatar rounded  size="md" :class="$q.dark.isActive ? 'bg-white text-primary' : 'bg-primary text-white'">
              <q-icon name="fa-solid fa-dashboard fa-shake" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <div class="text-subtitle2">{{$t('app')}}</div>
            <div class="text-caption">{{$t('brand')}}</div>
          </q-item-section>
          <q-item-section side style="min-width:40px">
            <q-icon name="unfold_more" class="cursor-pointer" />
          </q-item-section>
        </q-item>
        <div class="q-pa-sm"></div>
        <div v-if="leftDrawerOpen">
          <EssentialLink 
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
      </div>
      <div v-if="!leftDrawerOpen">
        <div class="q-py-md"   
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
          v-access="link.roles"
        >
          <div class="column items-center">
            <q-icon :name="link.icon" size="xs" class="mini-icon cursor-pointer" @click="$router.push(link.link)" />
          </div>
        </div>
      </div>
      <SidebarProfile />
      </q-list>
    </q-drawer>
    <q-page-container :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'">
      <router-view  />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed} from 'vue'
import { useQuasar } from 'quasar'
import EssentialLink from 'components/EssentialLink.vue'
import DarkMode from '../components/DarkMode.vue'
import { useI18n } from 'vue-i18n'
import { useMainStore } from 'stores/MainStore'

import SidebarProfile from 'components/SidebarProfile.vue'

import { useHelpersBooking } from 'src/composables/helpers.js'

export default defineComponent({
  name: 'MainLayout',

  components: 
  {
    EssentialLink,
    SidebarProfile,
  },
  data: () => ({}),

  setup () 
  {
  const { t } = useI18n()
  const $q = useQuasar()
    
    const linksList = 
    [
      {
        title: t('MainLayout.menu.home.title'),
        name: 'home',
        caption: t('MainLayout.menu.home.caption'),
        icon: 'home',
        link: '/dashboard',
      },

    ]

    const leftDrawerOpen = ref(true)

    // Keep drawer visible on desktop (so mini mode is shown when leftDrawerOpen is false).
    // On small screens, mirror leftDrawerOpen to allow overlay open/close behavior.
    const drawerModel = computed({
      get () {
        return $q.screen.gt.xs ? true : leftDrawerOpen.value
      },
      set (val) {
        if (!$q.screen.gt.xs) {
          leftDrawerOpen.value = val
        }
      }
    })
    
    // Determine drawer behavior based on screen size. On large screens use 'desktop',
    // on small screens use 'mobile' so the drawer behaves as an overlay.
    const drawerBehavior = computed(() => $q.screen.gt.xs ? 'desktop' : 'mobile')

    return {
      essentialLinks: linksList,
      linksList,
      leftDrawerOpen,
      drawerModel,
      onAvatarClick () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
        drawerBehavior,
      toggleLeftDrawer () 
      {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  computed: 
  {
    initials()
    {
      const store = useMainStore()
      const { Initials } = useHelpersBooking()
      return Initials(store.Name)
    }
  },
})
</script>
<style scoped>
:deep(.input-box .q-field__control),
:deep(.input-box .q-field__marginal) 
{
  height: 32px;
  font-size: 16px;
}
</style>

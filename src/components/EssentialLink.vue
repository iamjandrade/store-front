<template>
<div v-if="children.length == 0">
  <div v-if="link">
  <q-item class="q-mb-xs" active-class="bg-secondary" dense :to="link" clickable exact :inset-level="level" :class="{'active-link': isActive(link)}">
      <q-item-section v-if="icon" avatar class="icon-section">
        <q-icon :name="icon" size="xs"  />
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-body">{{title}}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
  <div v-if="!link">
  <q-item class="q-mb-xs" @click="Get(method)"  clickable exact  :inset-level="level" :class="{'active-link': isActive(link)}">
      <q-item-section v-if="icon" avatar class="icon-section">
        <q-icon :name="icon"  />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{title}}</q-item-label>
        <q-item-label caption>{{caption}}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</div>
<div v-else>
  <div v-if="children.length > 0">
    <q-expansion-item
      class="q-mb-xs"
      expand-separator
      :icon=icon
      :label="title"
      :caption="caption"
      :header-inset-level="level"
      default-closed
    >
      <EssentialLink
        class="q-ml-md q-mb-xs"
        v-for="child in children"
        :key="child"
        v-bind="child"
      >
      </EssentialLink>
    </q-expansion-item>
  </div>
  <div v-else>
    <q-item clickable v-ripple :inset-level="level">
      <q-item-section>{{title}}</q-item-section>
    </q-item>
  </div>
</div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: 
  {
    title: 
    {
      type: String,
      required: true
    },
    name: 
    {
      type: String,
      required: true
    },
    caption: 
    {
      type: String,
      default: ''
    },
    link: 
    {
      type: String,
      default: '#'
    },
    icon: 
    {
      type: String,
      default: ''
    },
    method: 
    {
      type: String,
      default: ''
    },
    level: 
    {
      type: Number,
      default: 0
    },
    children:
    {
      type: Array,
      default: []
    }
  },
  methods:
  {
    isActive(routePath) 
    {
      return this.$route.path === routePath
    },
    Get(method)
    {
      eval('this.'+method+'()')
    },
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
})
</script>
<style scoped>
/* Make the active item background more rounded */
.active-link,
.q-item
{
  border-radius: 6px;
  overflow: hidden;
}

/* Ensure the hover/active visual stays rounded for expansion headers too */
.q-expansion-item__header,
.q-expansion-item__header.active-link 
{
  border-radius: 6px;
  overflow: hidden;
}
</style>
<template>
  <div class="row justify-end">
    <div class="dark-toggle">
      <q-btn size="sm" flat :class="$q.dark.isActive ? 'text-white' : 'text-primary'"  :icon="$q.dark.isActive ? 'dark_mode' : 'light_mode'" @click="DarkMode()" />
    </div>
  </div>
</template>

<script>

export default 
{
  data: () => 
  ({

  }),  
  methods:
  {
    DarkMode() 
    {
      this.$q.dark.set(!this.$q.dark.isActive)
    },
  },
  mounted() 
  {
  },
}
</script>
<style scoped>
.dark-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.dark-toggle__label {
  font-size: 0.9rem;
}
</style>
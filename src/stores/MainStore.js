import { defineStore } from 'pinia'

export const useMainStore = defineStore('store', 
{
  state: () => 
  ({ 
    Authenticated: false,
    Lang: navigator.language.slice(0,2),
    User: '',
    Name: '',
  }),
  getters: 
  {
    UpdateToken: (state) => state.Token
  },
  actions:
  {
  },
  persist: true,
})
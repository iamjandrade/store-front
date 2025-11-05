import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { useMainStore } from 'stores/MainStore'
import { Notify } from 'quasar'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

var baseURL = process.env.PROD ? process.env.BASE_URL : process.env.DEV ? process.env.BASE_URL_DEV : null

const api = axios.create({ baseURL: baseURL})

export default boot(({ app }) => 
{
  // for use inside Vue files (Options API) through this.$axios and this.$api
  
  api.interceptors.request.use((config) => 
  {
    const store = useMainStore()

    if(store.Authenticated == false)
    {
      config.headers.Accept = "application/json"
      config.headers.lang = store.Lang
      return config
    }
    if(store.Authenticated == true)
    {
      config.headers.Accept = "application/json"
      //config.headers.Authorization = `Bearer ${store.Token}`
      config.headers.lang = store.Lang
      config.headers['X-User-Email'] = store.User
      return config
    }
  })

  api.interceptors.response.use
  (
    response => response,
    error => 
    {
      console.log(error.response.status )
      if (error.response.status === 403) 
      {
        console.log(error.response.data.msg)
        Notify.create({type:'negative',position:'bottom-right',message:error.response.data.msg})
      }
      throw error
    }
  )
  
  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
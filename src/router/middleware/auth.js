import { useMainStore } from 'stores/MainStore'

export const ifAuth = (to, from, next) => 
{
  const store = useMainStore()

  if (store.Authenticated == false) 
  {
    next({ path: "/" })
    return;
  }

  //const role = store.User?.role
  const role = store.Role

  if (to.meta && to.meta.allowedRoles && !to.meta.allowedRoles.includes(role)) 
  {
    next({ path: "/" })
    return
  }

  next();
}

export const ifNotAuth = (to, from, next) => 
{
  if (to.name === 'trends') 
  {
    next()
    return
  }
  
  const store = useMainStore()

  if (store.Authenticated == true) 
  {
    next
    ({
      path: "/dashboard" 
    })
  } 
  else next()
}
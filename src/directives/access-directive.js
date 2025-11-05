

import { useMainStore } from "../stores/MainStore"
const store = useMainStore()

function hasAccess(roles) 
{
  if (!roles) return false
  const userRoles = Array.isArray(store.Role) ? store.Role : [store.Role]
  const requiredRoles = Array.isArray(roles) ? roles : [roles]
  return requiredRoles.some(role => userRoles.includes(role))
}

function removeAccess(el, vnode) 
{
  if (vnode?.el?.parentNode) 
  {
    vnode.el.parentNode.removeChild(vnode.el)
  } else if (el.parentNode) 
  {
    el.parentNode.removeChild(el)
  }
}

export default 
{
  mounted(el, binding, vnode) 
  {
    if (!hasAccess(binding.value)) 
    {
      removeAccess(el, vnode)
    }
  },
  updated(el, binding, vnode) 
  {
    if (!hasAccess(binding.value)) 
    {
      removeAccess(el, vnode)
    }
  },
  beforeUnmount() 
  {
  }
}

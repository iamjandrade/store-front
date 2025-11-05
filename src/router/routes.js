import { ifAuth, ifNotAuth } from "./middleware/auth"

const routes = 
[
  {
    path: '/',
    name: 'login',
    component: () => import('pages/LoginPage.vue'),
    beforeEnter: [ifNotAuth],
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: [ifAuth],
    children: 
    [
      { path: '', name: 'home', component: () => import('src/pages/dashboard/home/HomePage.vue')},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    name: 'not-found',
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

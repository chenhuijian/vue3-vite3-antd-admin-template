import { createRouter, createWebHashHistory } from 'vue-router'
import { createPermissionGuard } from './permission.js'

import Layout from '@/layout'
import Login from '@/pages/login'
import Home from '@/pages/home'

const baseRoutes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect:'/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
        meta:{
          activeMenu:'/home'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      isWhite: true
    }
  }
]


const routes = baseRoutes.concat(

)

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})


export function setupRouter(app) {
  app.use(router)
  createPermissionGuard(router)
}

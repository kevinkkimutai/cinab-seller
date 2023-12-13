import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/allproducts',
      name: 'Products',
      component: () => import('../views/ProductsView.vue')
    },
    {
      path: '/inventory',
      name: 'Inventory',
      component: () => import('../views/InventoryView.vue')
    }
  ]
})

export default router

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
      path: '/login',
      name: 'get started',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/vendor',
      name: 'vendor',
      component: () => import('../views/VendorDetails.vue')
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

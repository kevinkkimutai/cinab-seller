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
      path: '/inbox',
      name: 'inbox',
      component: () => import('../views/ChatAreaView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/products',
      name: 'Products',
      component: () => import('../views/ProductsView.vue')
    },
    {
      path: '/inventory',
      name: 'Inventory',
      component: () => import('../views/InventoryView.vue')
    },
    {
      path: '/offers',
      name: 'Offers',
      component: () => import('../views/OffersView.vue')
    },
    {
      path: '/orders',
      name: 'Orders',
      component: () => import('../views/OrdersView.vue')
    },
    {
      path: '/sales',
      name: 'Sales',
      component: () => import('../views/SalesView.vue')
    },
    {
      path: '/productform',
      name: 'UploadForm',
      component: () => import('../views/UploadFormView.vue')
    },

  ]
})

export default router

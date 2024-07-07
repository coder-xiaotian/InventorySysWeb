import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import("../views/Login.vue"),
    },
    {
      path: '/',
      name: 'home',
      redirect: '/inventory-list',
      component: () => import('../views/Home/index.vue'),
      children: [
        {
          path: 'inventory-list',
          name: 'inventory-list',
          title: '库存管理',
          component: () => import('../views/Home/InventoryList/index.vue'),
        },
        {
          path: 'users',
          name: 'users',
          title: '用户管理',
          component: () => import('../views/Home/Users/index.vue'),
        }
      ]
    },
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import PokeHomeView from '../views/PokeHomeView.vue'
import PokeDetailView from '../views/PokeDetailView.vue'
import StoreHomeView from '../views/StoreHomeView.vue'
import StoreDetailView from '../views/StoreDetailView.vue'
import StoreCreateView from '../views/StoreCreateView.vue'
import StoreEditView from '../views/StoreEditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/poke',
    },
    {
      path: '/poke',
      component: PokeHomeView,
    },
    {
      path: '/poke/detail/:id',
      component: PokeDetailView,
    },
    {
      path: '/store',
      component: StoreHomeView,
    },
    {
      path: '/store/detail/:id',
      component: StoreDetailView,
    },
    {
      path: '/store/create',
      component: StoreCreateView,
    },
    {
      path: '/store/edit/:id',
      component: StoreEditView,
    },
  ],
})

export default router

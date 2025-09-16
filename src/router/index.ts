import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../components/pages/LandingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage,
    },
    {
      path: '/components',
      name: 'components',
      component: () => import('../components/pages/ComponentGallery.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../components/pages/SelfIntroduction.vue'),
    },
  ],
})

export default router

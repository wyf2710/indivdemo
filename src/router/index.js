import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Music from '../views/Music.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/music',
    name: 'music',
    component: Music
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { 
    path: '/papers/media-of-communication',
    beforeEnter() {
      window.location.href = '/papers/media-of-communication.pdf'
    } 
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

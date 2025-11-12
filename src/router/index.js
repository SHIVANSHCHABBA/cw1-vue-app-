import { createRouter, createWebHashHistory } from 'vue-router'
import LessonsPage from '../pages/LessonsPage.vue'
import CartPage from '../pages/CartPage.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: LessonsPage },
    { path: '/cart', name: 'cart', component: CartPage }
  ]
})

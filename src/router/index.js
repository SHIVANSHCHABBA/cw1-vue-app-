import { createRouter, createWebHashHistory } from 'vue-router';
import LessonsPage from '../pages/LessonsPage.vue';
import CartPage from '../pages/CartPage.vue';

const routes = [
  { path: '/', component: LessonsPage },
  { path: '/cart', component: CartPage }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;

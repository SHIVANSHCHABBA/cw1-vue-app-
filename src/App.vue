<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { cart } from './store/cart.js';

const count = computed(() =>
  cart.items.reduce((sum, it) => sum + (it.qty || 0), 0)
);
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <RouterLink to="/" class="navbar-brand">Lessons</RouterLink>

      <div class="d-flex align-items-center">
        <RouterLink to="/" class="nav-link d-inline-block">Lessons</RouterLink>

        <RouterLink
          v-if="count > 0"
          to="/cart"
          class="btn btn-primary ms-2"
        >
          Cart ({{ count }})
        </RouterLink>

        <button
          v-else
          class="btn btn-primary ms-2"
          disabled
        >
          Cart (0)
        </button>
      </div>
    </div>
  </nav>

  <main class="container mt-4">
    <RouterView />
  </main>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

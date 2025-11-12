<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { computed } from 'vue';
import { cart } from './store/cart.js';

const count = computed(() =>
  cart.items.reduce((sum, it) => sum + (it.qty || 0), 0)
);
</script>

<template>
  <nav class="p-3 border-bottom d-flex gap-3 align-items-center">
    <RouterLink to="/">Lessons</RouterLink>
    <RouterLink to="/cart">Cart</RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped>
nav a { text-decoration: none; }
nav a.router-link-active { font-weight: 600; }
</style>

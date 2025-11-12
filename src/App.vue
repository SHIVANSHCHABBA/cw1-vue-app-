<script setup>
import { RouterView, useRouter } from 'vue-router'
import { computed } from 'vue'
import { cart } from './store/cart'

const router = useRouter()
const hasItems = computed(() => cart.items.length > 0)
const count = computed(() => cart.items.reduce((s, it) => s + (it.qty || 0), 0))
function goLessons(){ router.push('/') }
function goCart(){ if (hasItems.value) router.push('/cart') }
</script>

<template>
  <header class="mb-4 shadow-sm">
    <nav class="px-3 py-2 app-header">
      <div class="container d-flex align-items-center justify-content-between">
        <button class="btn btn-link text-white text-decoration-none fw-bold fs-4 p-0"
                @click="goLessons">EduLessons</button>

        <button class="btn btn-light d-inline-flex align-items-center gap-2"
                :disabled="!hasItems" @click="goCart">
          <i class="fa-solid fa-cart-shopping"></i>
          Cart
          <span v-if="count" class="badge text-bg-primary">{{ count }}</span>
        </button>
      </div>
    </nav>
  </header>

  <main class="container">
    <transition name="fade" mode="out-in">
      <RouterView />
    </transition>
  </main>

  <footer class="text-center text-muted small py-4 mt-5">
    © 2025 Shivansh Chabba — After-School Classes
  </footer>
</template>

<style>
/* global background (subtle animated gradient) */
body{
  background: linear-gradient(120deg, #eef4ff, #f9fbff, #f8f5ff);
  background-size: 400% 400%;
  animation: bgMove 20s ease infinite;
  min-height: 100vh;
}
@keyframes bgMove{
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>

<style scoped>
.app-header{
  background: linear-gradient(90deg,#0d6efd,#6f42c1);
}
.fade-enter-active, .fade-leave-active { transition: opacity .3s ease }
.fade-enter-from, .fade-leave-to { opacity: 0 }
</style>

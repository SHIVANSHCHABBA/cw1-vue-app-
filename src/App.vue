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
    <nav class="px-3 py-2"
         style="background: linear-gradient(90deg,#0d6efd,#6f42c1);">
      <div class="container d-flex align-items-center justify-content-between">
        <button class="btn btn-link text-white text-decoration-none fw-bold fs-4 p-0"
                @click="goLessons">📚 EduLessons</button>

        <div class="d-flex align-items-center gap-3">
          <button class="btn btn-light d-inline-flex align-items-center gap-2"
                  :disabled="!hasItems" @click="goCart" aria-label="Go to cart">
            <i class="fa-solid fa-cart-shopping"></i>
            <span class="d-none d-md-inline">Cart</span>
            <span v-if="count" class="badge text-bg-primary ms-2">{{ count }}</span>
          </button>
        </div>
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

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .35s ease }
.fade-enter-from, .fade-leave-to { opacity: 0 }
</style>

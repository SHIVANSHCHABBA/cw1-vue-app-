<script setup>
import { RouterView, useRouter } from 'vue-router'
import { computed } from 'vue'
import { cart } from './store/cart'

// background image (must be in public/assets/study_bg.png)
const bgUrl = `${import.meta.env.BASE_URL}assets/study_bg.png`

const router = useRouter()
const hasItems = computed(() => cart.items.length > 0)
const count = computed(() => cart.items.reduce((s, it) => s + (it.qty || 0), 0))
function goLessons(){ router.push('/') }
function goCart(){ if (hasItems.value) router.push('/cart') }
</script>

<template>
  <!-- Full-page background image -->
  <div class="bg-image" :style="{ backgroundImage: `url('${bgUrl}')` }" aria-hidden="true"></div>

  <!-- Simple top bar exactly like your earlier design -->
  <header class="mb-3 shadow-sm">
    <nav class="px-3 py-2 app-header">
      <div class="container d-flex align-items-center justify-content-between">
        <button class="btn btn-link text-white text-decoration-none fw-bold fs-4 p-0"
                @click="goLessons">
          EduLessons
        </button>

        <button class="btn btn-light d-inline-flex align-items-center gap-2"
                :disabled="!hasItems" @click="goCart">
          <i class="fa-solid fa-cart-shopping"></i>
          Cart
          <span v-if="count" class="badge text-bg-primary">{{ count }}</span>
        </button>
      </div>
    </nav>
  </header>

  <!-- Your pages (Lessons / Cart) now sit directly on top of the background -->
  <main class="container py-2 py-md-3">
    <transition name="fade" mode="out-in">
      <RouterView />
    </transition>
  </main>

  <footer class="text-center text-muted small py-4 mt-3">
    © 2025 Shivansh Chabba — After-School Classes
  </footer>
</template>

<style>
/* basic page setup */
body{
  margin: 0;
  min-height: 100vh;
  background-color: #e8edf4; /* fallback if image fails */
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}

/* background image for whole page */
.bg-image{
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  filter: brightness(0.97) saturate(0.94);
}

/* soft veil so text & cards read nicely */
.bg-image::after{
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(245, 247, 251, 0.35);
  backdrop-filter: blur(2px);
}

/* your top blue header bar – kept simple */
.app-header{
  background: linear-gradient(90deg,#0d6efd,#6f42c1);
}

/* smooth page transitions */
.fade-enter-active, .fade-leave-active { transition: opacity .25s ease }
.fade-enter-from, .fade-leave-to       { opacity: 0 }
</style>

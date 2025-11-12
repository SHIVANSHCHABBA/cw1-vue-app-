<script setup>
import { RouterView, useRouter } from 'vue-router'
import { computed } from 'vue'
import { cart } from './store/cart'

// Build a URL that works locally AND on GitHub Pages
const bgUrl = `${import.meta.env.BASE_URL}assets/study_bg.png`

const router = useRouter()
const hasItems = computed(() => cart.items.length > 0)
const count = computed(() => cart.items.reduce((s, it) => s + (it.qty || 0), 0))
function goLessons(){ router.push('/') }
function goCart(){ if (hasItems.value) router.push('/cart') }
</script>

<template>
  <!-- Background image layer -->
  <div class="bg-image" :style="{ backgroundImage: `url('${bgUrl}')` }" aria-hidden="true"></div>

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
    <div class="app-surface rounded-5 p-3 p-md-4">
      <transition name="fade" mode="out-in">
        <RouterView />
      </transition>
    </div>
  </main>

  <footer class="text-center text-muted small py-4 mt-5">
    © 2025 Shivansh Chabba — After-School Classes
  </footer>
</template>

<style>
/* Keep a fallback color while the image loads */
body{ background-color: #f6f7fb; min-height: 100vh; margin: 0; }

/* Full viewport background */
.bg-image{
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

/* Optional overlay for readability on the photo */
.bg-image::after{
  content:"";
  position:absolute; inset:0;
  background: rgba(255,255,255,.42);
  backdrop-filter: blur(2px);
}

/* Header gradient */
.app-header{ background: linear-gradient(90deg,#0d6efd,#6f42c1); }

/* White sheet to keep content readable */
.app-surface{
  background: rgba(255,255,255,0.92);
  border: 1px solid rgba(13,110,253,.08);
  box-shadow: 0 18px 40px rgba(0,0,0,.10), inset 0 1px 0 rgba(255,255,255,.70);
}

/* Page fade */
.fade-enter-active, .fade-leave-active { transition: opacity .3s ease }
.fade-enter-from, .fade-leave-to { opacity: 0 }
</style>

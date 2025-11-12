<script setup>
import { RouterView, useRouter } from 'vue-router'
import { computed } from 'vue'
import { cart } from './store/cart'

const router = useRouter()
const hasItems = computed(() => cart.items.length > 0)
const count = computed(() => cart.items.reduce((s, it) => s + (it.qty || 0), 0))
function goLessons(){ router.push('/') }
function goCart(){ if (hasItems.value) router.push('/cart') }

/**
 * Build an asset URL that works locally AND on GitHub Pages.
 * Anything in /public is served under the app's BASE_URL.
 */
const bgPng  = import.meta.env.BASE_URL + 'assets/study_bg.png'
const bgWebp = import.meta.env.BASE_URL + 'assets/study_bg.webp' // optional, if you add it
</script>

<template>
  <!-- Single background layer; the CSS below reads the custom property -->
  <div class="bg-image"
       :style="{'--bg-url': `url('${bgWebp || bgPng}')`, '--bg-fallback': `url('${bgPng}')`}"
       aria-hidden="true"></div>

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

  <!-- Centered white panel so content stays readable on the photo -->
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
/* Global body reset */
body{
  margin: 0;
  min-height: 100vh;
  background-color: #f6f7fb; /* fallback while image loads */
}

/* Full-page background image using CSS custom props for safe URLs */
.bg-image{
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;

  /* Prefer WebP if present; fallback to PNG (both served from /public) */
  background:
    -webkit-image-set(var(--bg-url) 1x, var(--bg-fallback) 1x) center/cover no-repeat fixed;
  background-image:
    image-set(var(--bg-url) type('image/webp') 1x, var(--bg-fallback) type('image/png') 1x);
}

/* Optional subtle overlay: improves text/card contrast on the photo */
.bg-image::after{
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,.42);
  backdrop-filter: blur(2px);
}

/* Gradient header bar (kept from your design) */
.app-header{
  background: linear-gradient(90deg,#0d6efd,#6f42c1);
}

/* The big white rounded app sheet */
.app-surface{
  background: rgba(255,255,255,0.92);
  border: 1px solid rgba(13,110,253,.08);
  box-shadow:
    0 18px 40px rgba(0,0,0,.10),
    inset 0 1px 0 rgba(255,255,255,.70);
}

/* Page fade transitions */
.fade-enter-active, .fade-leave-active { transition: opacity .3s ease }
.fade-enter-from, .fade-leave-to { opacity: 0 }
</style>

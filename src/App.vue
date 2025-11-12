<script setup>
import { RouterView, useRouter } from 'vue-router'
import { computed } from 'vue'
import { cart } from './store/cart'

// Works locally AND on GitHub Pages
const bgUrl = `${import.meta.env.BASE_URL}assets/study_bg.png`

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

  <!-- The background image is now part of this panel -->
  <main class="container">
    <div class="app-surface rounded-5 p-3 p-md-4" :style="{'--surface-bg': `url('${bgUrl}')`}">
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
/* simple page fallback while image loads */
body{ background:#f6f7fb; margin:0; min-height:100vh; }

/* header gradient bar */
.app-header{ background: linear-gradient(90deg,#0d6efd,#6f42c1); }

/* PANEL that owns the background image */
.app-surface{
  position: relative;
  overflow: hidden;               /* clip the image to rounded corners */
  border: 1px solid rgba(13,110,253,.08);
  box-shadow: 0 18px 40px rgba(0,0,0,.10), inset 0 1px 0 rgba(255,255,255,.70);
  background: transparent;        /* image sits behind via ::before */
}

/* The photo becomes part of the panel */
.app-surface::before{
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image: var(--surface-bg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;         /* scales together with panel */
  background-attachment: local;   /* ties to the element, not viewport */
  transform: translateZ(0);       /* avoid jitter on some GPUs */
}

/* Optional: soft white veil for readability (tune opacity) */
.app-surface::after{
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: rgba(255,255,255,.40);
  backdrop-filter: blur(1.5px);
}

/* Page fade */
.fade-enter-active, .fade-leave-active { transition: opacity .3s ease }
.fade-enter-from, .fade-leave-to { opacity: 0 }

/* On small screens the image can be too busy—lighten the veil */
@media (max-width: 576px){
  .app-surface::after{ background: rgba(255,255,255,.55); backdrop-filter: blur(2px); }
}
</style>

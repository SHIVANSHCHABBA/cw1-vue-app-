<script setup>
import { RouterView, useRouter } from 'vue-router'
import { computed } from 'vue'
import { cart } from './store/cart'

const bgUrl = `${import.meta.env.BASE_URL}assets/study_bg.png`

const router = useRouter()
const hasItems = computed(() => cart.items.length > 0)
const count = computed(() => cart.items.reduce((s, it) => s + (it.qty || 0), 0))
function goLessons(){ router.push('/') }
function goCart(){ if (hasItems.value) router.push('/cart') }
</script>

<template>
  <!-- Background photo (lamp/books) -->
  <div class="bg-photo" :style="{ backgroundImage: `url('${bgUrl}')` }" aria-hidden="true"></div>

  <!-- Main “clay panel” -->
  <main class="container my-3 my-md-4">
    <div class="surface rounded-5 shadow-xxl">
      <div class="surface-head d-flex align-items-center justify-content-between px-3 px-md-4 py-2">
        <button class="btn btn-link brand text-decoration-none p-0" @click="goLessons">EduLessons</button>

        <button class="btn btn-light cart-pill d-inline-flex align-items-center gap-2"
                :disabled="!hasItems" @click="goCart">
          <i class="fa-solid fa-cart-shopping"></i>
          Cart
          <span v-if="count" class="badge text-bg-primary">{{ count }}</span>
        </button>
      </div>

      <div class="surface-body p-3 p-md-4 p-lg-5">
        <transition name="fade" mode="out-in">
          <RouterView />
        </transition>
      </div>
    </div>
  </main>

  <footer class="text-center text-muted small py-4">
    © 2025 Shivansh Chabba — After-School Classes
  </footer>
</template>

<style>
/* ===================== GLOBAL ===================== */
:root {
  --soft-blue: #7a91c9;
  --muted-bg: #e8edf4;
  --panel-bg: #f4f6f9;
  --panel-shadow: rgba(0, 0, 0, 0.08);
  --brand-dark: #25324b;
  --accent-blue: #4c7ce0;
}

body {
  margin: 0;
  min-height: 100vh;
  background-color: var(--muted-bg);
  font-family: "Inter", system-ui, sans-serif;
}

/* ===================== BACKGROUND IMAGE ===================== */
.bg-photo {
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  background-position: 45% center; /* lamp + books aligned visually */
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  filter: brightness(0.97) saturate(0.94); /* tone down whites slightly */
}

.bg-photo::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(245, 247, 251, 0.35);
  backdrop-filter: blur(2px);
}

/* ===================== SURFACE (CLAY PANEL) ===================== */
.surface {
  max-width: 1100px;
  margin: 0 auto;
  background: var(--panel-bg);
  border-radius: 32px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 28px 80px var(--panel-shadow), inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

/* ===================== HEADER ===================== */
.surface-head {
  background: #f0f2f6;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}

.brand {
  font-weight: 800;
  font-size: 1.3rem;
  color: var(--brand-dark);
  letter-spacing: -0.5px;
}

/* ===================== CART BUTTON ===================== */
.cart-pill {
  border-radius: 999px;
  background-color: #f9fafb;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  color: var(--brand-dark);
  transition: all 0.2s ease;
}
.cart-pill:hover {
  background-color: #eef1f8;
}

/* ===================== BODY ===================== */
.surface-body {
  background: #ffffffcc; /* slightly translucent to let bg influence tone */
  border-top: 1px solid rgba(255, 255, 255, 0.7);
}

/* ===================== TRANSITIONS ===================== */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* ===================== RESPONSIVE ===================== */
@media (max-width: 576px) {
  .surface {
    border-radius: 20px;
  }
  .surface-body {
    padding: 1.25rem !important;
  }
}
</style>

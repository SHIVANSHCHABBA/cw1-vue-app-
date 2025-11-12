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
  <!-- background painter (gradients + props) -->
  <div class="bg-canvas" aria-hidden="true"></div>
  <div class="bg-props" aria-hidden="true"></div>

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

  <!-- centered clay panel -->
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
/* pastel wall + vignette */
body{
  background: linear-gradient(180deg,#eef2ff 0%, #f9fbff 60%, #f5f3ff 100%);
  background-attachment: fixed;
  min-height: 100vh;
}

.bg-canvas{
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -2;
}
.bg-canvas::before,
.bg-canvas::after{
  content: "";
  position: absolute; inset: 0;
  background:
    radial-gradient(600px 600px at 8% 26%, rgba(160,180,255,.28), transparent 60%),
    radial-gradient(540px 540px at 92% 76%, rgba(160,180,255,.20), transparent 60%),
    radial-gradient(720px 720px at 50% 108%, rgba(170,160,255,.16), transparent 60%);
}
.bg-canvas::after{
  box-shadow: inset 0 0 200px rgba(0,0,0,.06);
}

/* lamp + books (inline SVGs as data URIs) */
.bg-props{
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -1;
}

/* left lamp */
.bg-props::before{
  content: "";
  position: absolute;
  left: clamp(-40px, 2vw, 20px);
  top: clamp(60px, 10vh, 140px);
  width: clamp(140px, 18vw, 220px);
  height: clamp(140px, 18vw, 220px);
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url("data:image/svg+xml;utf8,\
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 220'>\
    <defs>\
      <linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>\
        <stop offset='0' stop-color='%23ffffff'/>\
        <stop offset='1' stop-color='%23e9eefc'/>\
      </linearGradient>\
    </defs>\
    <g fill='url(%23g)' stroke='%23d7def5' stroke-width='3'>\
      <ellipse cx='95' cy='65' rx='70' ry='45'/>\
      <path d='M55 90 L35 140 C30 150 38 160 48 158 L122 140'/>\
      <rect x='115' y='135' width='12' height='35' rx='4'/>\
      <rect x='95' y='170' width='60' height='18' rx='9'/>\
    </g>\
  </svg>");
  filter: drop-shadow(0 10px 20px rgba(0,0,0,.08));
  opacity: .95;
}

/* right books */
.bg-props::after{
  content: "";
  position: absolute;
  right: clamp(-20px, 2vw, 24px);
  bottom: clamp(40px, 6vh, 80px);
  width: clamp(160px, 18vw, 240px);
  height: clamp(160px, 18vw, 240px);
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url("data:image/svg+xml;utf8,\
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'>\
    <defs>\
      <linearGradient id='gb' x1='0' y1='0' x2='0' y2='1'>\
        <stop offset='0' stop-color='%23ffffff'/>\
        <stop offset='1' stop-color='%23eef3ff'/>\
      </linearGradient>\
    </defs>\
    <g fill='url(%23gb)' stroke='%23d7def5' stroke-width='3'>\
      <rect x='40' y='170' width='160' height='26' rx='8'/>\
      <rect x='30' y='144' width='170' height='26' rx='8'/>\
      <rect x='20' y='118' width='180' height='26' rx='8'/>\
      <rect x='70' y='92'  width='130' height='26' rx='8'/>\
    </g>\
  </svg>");
  filter: drop-shadow(0 12px 24px rgba(0,0,0,.10));
  opacity: .96;
}

/* big white rounded app surface */
.app-surface{
  background: #ffffff;
  border: 1px solid rgba(13,110,253,.08);
  box-shadow:
    0 18px 40px rgba(0,0,0,.10),
    inset 0 1px 0 rgba(255,255,255,.70);
}

/* header gradient bar */
.app-header{
  background: linear-gradient(90deg,#0d6efd,#6f42c1);
}

/* transitions */
.fade-enter-active, .fade-leave-active { transition: opacity .3s ease }
.fade-enter-from, .fade-leave-to { opacity: 0 }

/* hide props on very small screens for clarity */
@media (max-width: 576px){
  .bg-props::before, .bg-props::after { display: none; }
}
</style>

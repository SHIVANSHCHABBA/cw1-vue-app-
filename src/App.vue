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
  <!-- Background photo (lamp/books) -->
  <div class="bg-photo" :style="{ backgroundImage: `url('${bgUrl}')` }" aria-hidden="true"></div>

  <!-- Centered clay panel, like the screenshot -->
  <main class="container my-3 my-md-4">
    <div class="surface rounded-5 shadow-xxl">
      <!-- Light panel header with brand + cart pill -->
      <div class="surface-head d-flex align-items-center justify-content-between px-3 px-md-4 py-2">
        <button class="btn btn-link brand text-decoration-none p-0" @click="goLessons">EduLessons</button>

        <button class="btn btn-light cart-pill d-inline-flex align-items-center gap-2"
                :disabled="!hasItems" @click="goCart">
          <i class="fa-solid fa-cart-shopping"></i>
          Cart
          <span v-if="count" class="badge text-bg-primary">{{ count }}</span>
        </button>
      </div>

      <!-- Body area where Lessons/Cart pages render -->
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
/* 0) Base */
:root { color-scheme: light; }
body{ margin:0; min-height:100vh; background:#eaf0f7; }

/* 1) Background photo behaves like the screenshot */
.bg-photo{
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  background-position: center;      /* adjust this if you want more lamp/books visible */
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
/* Gentle vignette for depth */
.bg-photo::after{
  content:"";
  position:absolute; inset:0;
  background:
    radial-gradient(1200px 520px at 50% 102%, rgba(0,0,0,.08), transparent 60%),
    linear-gradient(to bottom, rgba(255,255,255,.06), rgba(255,255,255,.06));
}

/* 2) Main surface (matches the device-like panel in the reference) */
.surface{
  max-width: 1060px;           /* width similar to screenshot */
  margin: 0 auto;
  background: #f6f5f2;         /* warm light header background tone */
  border: 1px solid rgba(0,0,0,.05);
  overflow: hidden;            /* clip children to rounded corners */
  border-radius: 28px;         /* big radius like the mock */
}
/* inner shadow + lift */
.shadow-xxl{
  box-shadow:
    0 28px 68px rgba(0,0,0,.18),
    0 2px 0 rgba(255,255,255,.7) inset;
}

/* 3) Panel header (inside the surface) */
.surface-head{
  background: #f3f2ef;
  border-bottom: 1px solid rgba(0,0,0,.06);
}
.brand{
  font-weight: 800;
  font-size: 1.25rem;
  color: #1b2a4e;
}

/* Cart pill like the screenshot */
.cart-pill{
  border-radius: 999px;
  padding: .35rem .8rem;
  box-shadow: 0 4px 10px rgba(0,0,0,.08);
}

/* 4) Content area under the header is white in the screenshot */
.surface-body{
  background: #ffffff;
  border-top: 1px solid rgba(255,255,255,.8);
}

/* 5) Page fade transition */
.fade-enter-active, .fade-leave-active { transition: opacity .25s ease }
.fade-enter-from, .fade-leave-to { opacity: 0 }

/* 6) Responsive tweaks */
@media (max-width: 576px){
  .surface{ border-radius: 18px; }
  .surface-body{ padding: 1.25rem !important; }
}
</style>

<script setup>
import { RouterView, useRouter } from 'vue-router'
import { computed } from 'vue'
import { cart } from './store/cart.js'

const router = useRouter()
const hasItems = computed(() => cart.items.length > 0)
const count = computed(() => cart.items.reduce((s, it) => s + (it.qty || 0), 0))

function goLessons() { router.push('/') }
function goCart()    { if (hasItems.value) router.push('/cart') }
</script>

<template>
  <nav class="p-3 border-bottom d-flex gap-2 align-items-center">
    <button class="btn btn-link" @click="goLessons">Lessons</button>

    <button class="btn btn-primary d-inline-flex align-items-center gap-2"
            :disabled="!hasItems" @click="goCart">
      Cart
      <span v-if="count" class="badge bg-light text-dark">{{ count }}</span>
    </button>
  </nav>

  <RouterView />
</template>

<style scoped>
nav :is(a,button){ text-decoration:none }
</style>

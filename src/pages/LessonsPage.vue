<template>
  <div class="pt-2">
    <div class="bg-light rounded-4 p-4 p-md-5 mb-4">
      <h1 class="display-6 fw-bold text-primary mb-1">Explore Lessons</h1>
      <p class="text-muted m-0">Find, sort, and book your favourite classes instantly.</p>
    </div>

    <div class="row g-3 align-items-end mb-3">
      <div class="col-lg-4">
        <label class="form-label">Search</label>
        <input class="form-control" v-model="query" placeholder="type to search..." />
      </div>
      <div class="col-lg-4">
        <label class="form-label">Sort by</label>
        <select class="form-select" v-model="sortKey">
          <option value="topic">Subject</option>
          <option value="location">Location</option>
          <option value="price">Price</option>
          <option value="space">Spaces</option>
        </select>
      </div>
      <div class="col-lg-4">
        <label class="form-label d-block">Order</label>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" id="asc" value="true" v-model="sortAsc">
          <label class="form-check-label" for="asc">Ascending</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" id="desc" :value="false" v-model="sortAsc">
          <label class="form-check-label" for="desc">Descending</label>
        </div>
      </div>
    </div>

    <div v-if="loading" class="alert alert-info">Loading lessons…</div>
    <div v-if="error"   class="alert alert-danger">{{ error }}</div>

   <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
     <div class="col" v-for="lesson in sorted" :key="lesson._id">
       <LessonCard :lesson="lesson" :onAdd="addToCart" />
     </div>
   </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { getLessons, searchLessons } from '../api.js'
import { cart } from '../store/cart.js'
import LessonCard from '../components/LessonCard.vue'

const loading = ref(true), error = ref(''), lessons = ref([])
const query = ref('')
const sortKey = ref('space')   // 'topic' | 'location' | 'price' | 'space'
const sortAsc = ref(false)
let debounceTimer = null

async function loadAll(){
  loading.value = true; error.value = ''
  try { lessons.value = await getLessons() }
  catch(e){ error.value = e.message || 'Failed to load lessons' }
  finally { loading.value = false }
}
onMounted(loadAll)

watch(query, (val) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(async () => {
    if (!val) return loadAll()
    try { lessons.value = await searchLessons(val) } catch(e){ /* ignore */ }
  }, 250)
})

const sorted = computed(() => {
  const key = sortKey.value
  const dir = sortAsc.value ? 1 : -1
  return [...lessons.value].sort((a,b) => {
    const va = (key === 'price' || key === 'space') ? Number(a[key] ?? (a.space ?? a.spaces ?? 0)) : String(a[key] ?? '').toLowerCase()
    const vb = (key === 'price' || key === 'space') ? Number(b[key] ?? (b.space ?? b.spaces ?? 0)) : String(b[key] ?? '').toLowerCase()
    if (va > vb) return 1 * dir
    if (va < vb) return -1 * dir
    return 0
  })
})

function addToCart(lesson){
  if ((lesson.space ?? lesson.spaces ?? 0) <= 0) return
  cart.add(lesson)
  // decrement local visual spaces
  if (typeof lesson.space === 'number') lesson.space = Math.max(0, lesson.space - 1)
  else if (typeof lesson.spaces === 'number') lesson.spaces = Math.max(0, lesson.spaces - 1)
}
</script>

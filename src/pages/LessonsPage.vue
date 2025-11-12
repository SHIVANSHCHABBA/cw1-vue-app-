<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { getLessons, searchLessons } from '../api'
import { cart } from '../store/cart'
import LessonCard from '../components/LessonCard.vue'

const loading = ref(true)
const error = ref('')
const lessons = ref([])
const query = ref('')
const sortKey = ref('space')   // 'topic' | 'location' | 'price' | 'space'
const sortAsc = ref(false)

async function loadAll(){
  loading.value = true; error.value = ''
  try { lessons.value = await getLessons() }
  catch(e){ error.value = e.message || 'Failed to load lessons' }
  finally { loading.value = false }
}
onMounted(loadAll)

watch(query, async (val) => {
  if (!val) return loadAll()
  try { lessons.value = await searchLessons(val) } catch {}
})

const sorted = computed(() => {
  const key = sortKey.value, dir = sortAsc.value ? 1 : -1
  return [...lessons.value].sort((a,b) => {
    const va=a[key], vb=b[key]
    if (typeof va === 'number' && typeof vb === 'number') return (va-vb)*dir
    return String(va).localeCompare(String(vb)) * dir
  })
})

function addToCart(lesson){
  if (lesson.space<=0) return
  cart.add(lesson)
  lesson.space -= 1
}
</script>

<template>
  <div class="pt-2">
    <!-- Hero panel with quote -->
    <div class="clay-panel rounded-4 p-4 p-md-5 mb-4">
      <h1 class="display-6 fw-bold text-primary mb-2">Explore Lessons</h1>
      <p class="m-0 fst-italic text-muted d-flex align-items-start">
        <i class="fa-solid fa-quote-left me-2 text-primary"></i>
        <span>“Education is the passport to the future; for tomorrow belongs to those who prepare for it today.” — Malcolm X</span>
      </p>
    </div>

    <!-- Filters -->
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
          <input class="form-check-input" type="radio" id="desc" :value="false" v-model="sortAsc" checked>
          <label class="form-check-label" for="desc">Descending</label>
        </div>
      </div>
    </div>

    <!-- Status -->
    <div v-if="loading" class="alert alert-info">Loading lessons…</div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <!-- Grid -->
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div class="col" v-for="lesson in sorted" :key="lesson._id">
        <LessonCard :lesson="lesson" :onAdd="addToCart" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.clay-panel{
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(0,0,0,.07), inset 0 1px 0 rgba(255,255,255,.6);
  border: 1px solid rgba(13,110,253,.06);
}
</style>

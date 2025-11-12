<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { getLessons, searchLessons } from '../api';
import { cart } from '../store/cart';
import LessonCard from '../components/LessonCard.vue';

const loading = ref(true);
const error = ref('');
const lessons = ref([]);
const query = ref('');

const sortKey = ref('price');     // 'topic' | 'location' | 'price' | 'space'
const sortAsc = ref(true);

// fetch all lessons initially
async function loadAll() {
  loading.value = true; error.value = '';
  try { lessons.value = await getLessons(); }
  catch (e) { error.value = e.message || 'Failed to load lessons'; }
  finally { loading.value = false; }
}
onMounted(loadAll);

// search-as-you-type
watch(query, async (val) => {
  if (!val) return loadAll();
  try { lessons.value = await searchLessons(val); }
  catch (e) { console.error(e); }
});

// sorting
const sorted = computed(() => {
  const key = sortKey.value;
  const dir = sortAsc.value ? 1 : -1;
  return [...lessons.value].sort((a, b) => {
    const va = a[key], vb = b[key];
    if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
    return String(va).localeCompare(String(vb)) * dir;
  });
});

// add to cart (only visual decrement here; real update happens on checkout)
function addToCart(lesson) {
  if (lesson.space <= 0) return;
  cart.add(lesson);
  lesson.space -= 1;
}
</script>

<template>
  <div class="container py-4">
    <h1 class="mb-3">Lessons</h1>

    <div class="row g-3 align-items-end mb-3">
      <div class="col-md-4">
        <label class="form-label">Search</label>
        <input class="form-control" v-model="query" placeholder="type to search..." />
      </div>
      <div class="col-md-3">
        <label class="form-label">Sort by</label>
        <select class="form-select" v-model="sortKey">
          <option value="topic">Subject</option>
          <option value="location">Location</option>
          <option value="price">Price</option>
          <option value="space">Spaces</option>
        </select>
      </div>
      <div class="col-md-3">
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
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div class="row row-cols-1 row-cols-md-3 g-3">
      <div class="col" v-for="lesson in sorted" :key="lesson._id">
        <LessonCard :lesson="lesson" :onAdd="addToCart" />
      </div>
    </div>
  </div>
</template>

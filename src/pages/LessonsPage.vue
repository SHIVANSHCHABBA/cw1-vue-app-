<template>
  <div class="container mt-4">
    <div class="row">
      <aside class="col-md-3 mb-3">
        <h5>Sort By</h5>
        <div class="form-check" v-for="k in ['topic','location','price','space']" :key="k">
          <input
            class="form-check-input"
            type="radio"
            :id="'sort-' + k"
            :value="k"
            v-model="sortKey"
          />
          <label class="form-check-label" :for="'sort-' + k">{{ k }}</label>
        </div>

        <h6 class="mt-3">Direction</h6>
        <div class="form-check">
          <input class="form-check-input" type="radio" id="dir-asc" value="asc" v-model="sortDir" />
          <label class="form-check-label" for="dir-asc">Ascending</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" id="dir-desc" value="desc" v-model="sortDir" />
          <label class="form-check-label" for="dir-desc">Descending</label>
        </div>
      </aside>

      <main class="col-md-9">
        <div class="mb-3">
          <input
            v-model="q"
            type="search"
            class="form-control"
            placeholder="Search lessons..."
            aria-label="Search lessons"
          />
        </div>

        <div class="row">
          <div class="col-sm-6 col-lg-4 mb-3" v-for="l in sortedLessons" :key="l._id">
            <LessonCard :lesson="l" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import LessonCard from '../components/LessonCard.vue';
import { getLessons, searchLessons } from '../api.js';

const lessons = ref([]);
const sortKey = ref('topic');
const sortDir = ref('asc');
const q = ref('');
let debounceTimer = null;

onMounted(async () => {
  lessons.value = await getLessons();
});

watch(q, (newQ) => {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    if (!newQ) {
      lessons.value = await getLessons();
    } else {
      lessons.value = await searchLessons(newQ);
    }
  }, 250);
});

const sortedLessons = computed(() => {
  const arr = [...lessons.value];
  const key = sortKey.value;
  arr.sort((a, b) => {
    const extract = (item) => {
      if (key === 'space') return Number(item.space ?? item.spaces ?? 0) || 0;
      if (key === 'price') return Number(item.price) || 0;
      return (item[key] ?? '').toString().toLowerCase();
    };
    const va = extract(a);
    const vb = extract(b);
    if (va > vb) return sortDir.value === 'asc' ? 1 : -1;
    if (va < vb) return sortDir.value === 'asc' ? -1 : 1;
    return 0;
  });
  return arr;
});
</script>

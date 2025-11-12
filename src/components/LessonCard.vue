<template>
  <div class="card h-100 border-0 rounded-4 shadow-sm hover-card">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title mb-2 d-flex align-items-center gap-2">
        <i :class="['fa-solid', iconMap[lesson.topic] || 'fa-graduation-cap']" aria-hidden="true"></i>
        <span class="flex-grow-1">{{ lesson.topic }}</span>
      </h5>

      <p class="mb-1"><strong>Location:</strong> {{ lesson.location }}</p>
      <p class="mb-1"><strong>Price:</strong> £{{ lesson.price }}</p>
      <p class="mb-3"><strong>Spaces:</strong> {{ lesson.space }}</p>

      <button
        class="btn btn-primary mt-auto"
        :disabled="!(lesson.space > 0)"
        @click="onAdd(lesson)"
        :aria-disabled="!(lesson.space > 0)">
        Add to cart
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ lesson: Object, onAdd: Function })
const iconMap = {
  Math: 'fa-calculator', English: 'fa-book', Science: 'fa-flask',
  Music: 'fa-music', Drama: 'fa-masks-theater', Art: 'fa-palette',
  History: 'fa-landmark', Geography: 'fa-globe', Coding: 'fa-laptop-code',
  Physics: 'fa-atom'
}
</script>

<style scoped>
.hover-card { transition: transform .18s ease, box-shadow .18s ease }
.hover-card:hover { transform: translateY(-6px); box-shadow: 0 14px 32px rgba(13,110,253,0.12) }
</style>

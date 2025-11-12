<script setup>
const props = defineProps({ lesson: Object, onAdd: Function })

// map subjects to icons (you can customize freely)
const iconMap = {
  Math: "fa-calculator",
  English: "fa-book",
  Science: "fa-flask",
  Music: "fa-music",
  Dance: "fa-person-running",
  Art: "fa-palette",
  History: "fa-landmark",
  Geography: "fa-globe",
  Coding: "fa-laptop-code",
  Physics: "fa-atom",
}
</script>

<template>
  <div class="card h-100 shadow-sm">
    <div class="card-body">
      <h5 class="card-title mb-2 d-flex align-items-center gap-2">
        <i :class="['fa-solid', iconMap[lesson.topic] || 'fa-graduation-cap']"></i>
        {{ lesson.topic }}
      </h5>
      <p><strong>Location:</strong> {{ lesson.location }}</p>
      <p><strong>Price:</strong> £{{ lesson.price }}</p>
      <p><strong>Spaces:</strong> {{ lesson.space }}</p>
      <button class="btn btn-primary w-100"
              :disabled="lesson.space === 0"
              @click="onAdd(lesson)">
        Add to cart
      </button>
    </div>
  </div>
</template>

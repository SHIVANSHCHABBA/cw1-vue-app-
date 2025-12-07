<template>
  <div class="card lesson-card h-100 border-0 rounded-4">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title mb-2 d-flex align-items-center gap-2">
        <i :class="['fa-solid', iconClass]"></i>
        <span class="flex-grow-1">{{ lesson.topic }}</span>
      </h5>

      <p class="mb-1"><strong>Location:</strong> {{ lesson.location }}</p>
      <p class="mb-1"><strong>Price:</strong> £{{ lesson.price }}</p>
      <p class="mb-3"><strong>Spaces:</strong> {{ (lesson.space ?? lesson.spaces ?? 0) - spacesDeducted }}</p>

      <button
        class="btn btn-primary mt-auto w-100"
        :disabled="!((lesson.space ?? lesson.spaces ?? 0) - spacesDeducted > 0)"
        @click="onAdd(lesson)"
        :aria-disabled="!((lesson.space ?? lesson.spaces ?? 0) - spacesDeducted > 0)">
        Add to cart
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ lesson: Object, onAdd: Function, spacesDeducted: { type: Number, default: 0 } })
const iconMap = {
  Math:'fa-calculator', English:'fa-book', Science:'fa-flask',
  Music:'fa-music', Drama:'fa-masks-theater', Art:'fa-palette',
  History:'fa-landmark', Geography:'fa-globe', Coding:'fa-laptop-code',
  Robotics:'fa-robot', Physics:'fa-atom'
}
const iconClass = iconMap[props.lesson.topic] || 'fa-graduation-cap'
</script>

<style scoped>
.lesson-card{
  background: #fff;
  /* thin gradient border */
  border: 1px solid transparent;
  background-image:
    linear-gradient(#fff,#fff),
    linear-gradient(135deg, rgba(13,110,253,.18), rgba(111,66,193,.18));
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: 0 12px 24px rgba(0,0,0,.08);
  transition: transform .18s ease, box-shadow .18s ease;
}
.lesson-card:hover{
  transform: translateY(-6px);
  box-shadow: 0 18px 36px rgba(0,0,0,.12);
}
</style>

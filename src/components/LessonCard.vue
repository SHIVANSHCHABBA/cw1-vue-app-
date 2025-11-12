<script setup>
const props = defineProps({ lesson: Object, onAdd: Function });
</script>

<template>
  <div class="card h-100 shadow-sm">
    <div class="card-body">
      <h5 class="card-title mb-2">{{ lesson.topic }}</h5>
      <p class="mb-1"><strong>Location:</strong> {{ lesson.location }}</p>
      <p class="mb-1"><strong>Price:</strong> £{{ lesson.price }}</p>
      <p class="mb-3"><strong>Spaces:</strong> {{ lesson.space }}</p>
      <button class="btn btn-primary w-100" :disabled="lesson.space === 0" @click="onAdd(lesson)">
        Add to cart
      </button>
    </div>
  </div>
</template>

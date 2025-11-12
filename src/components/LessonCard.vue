<template>
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">{{ lesson.topic }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ lesson.location }}</h6>
      <p class="card-text">Price: £{{ lesson.price }}</p>
      <p class="card-text">Spaces: {{ spaces }}</p>
      <button
        class="btn btn-primary"
        :disabled="spaces <= 0"
        @click="addToCart"
      >
        Add to cart
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { cart } from '../store/cart.js';

const props = defineProps({
  lesson: { type: Object, required: true }
});

const spaces = ref(props.lesson.space ?? props.lesson.spaces ?? 0);

function addToCart() {
  if (spaces.value <= 0) return;
  cart.add(props.lesson);
  spaces.value = Math.max(0, spaces.value - 1);
}
</script>

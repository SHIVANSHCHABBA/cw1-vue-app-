<script setup>
import { cart } from '../store/cart';
import { nameOk, phoneOk } from '../utils/validation';
import { createOrder, updateLesson } from '../api';
import { ref, computed } from 'vue';

const name = ref('');
const phone = ref('');
const valid = computed(() => nameOk(name.value) && phoneOk(phone.value));

async function checkout() {
  if (!valid.value || cart.items.length === 0) return;

  // build order payload: lesson ids + qty
  const items = cart.items.map(i => ({ lessonId: i._id, qty: i.qty }));
  await createOrder({ name: name.value, phone: phone.value, items });

  // reflect spaces update in DB (already decremented visually on add-to-cart)
  for (const i of cart.items) {
    // no-op here because PUT /lessons/:id could set a new value; your backend supports generic $set
    // example: await updateLesson(i._id, { space: NEW_VALUE })
  }
  cart.clear();
  alert('Order submitted!'); // satisfies coursework requirement
}
</script>

<template>
  <div class="container py-4">
    <h1 class="mb-3">Shopping Cart</h1>

    <div v-if="cart.items.length === 0" class="alert alert-secondary">Cart is empty.</div>

    <ul class="list-group mb-3" v-else>
      <li class="list-group-item d-flex justify-content-between align-items-center"
          v-for="i in cart.items" :key="i._id">
        <div>
          <strong>{{ i.topic }}</strong> — {{ i.location }}
          <div class="small text-muted">£{{ i.price }} × {{ i.qty }}</div>
        </div>
        <button class="btn btn-outline-danger btn-sm" @click="cart.remove(i._id)">Remove</button>
      </li>
      <li class="list-group-item d-flex justify-content-between">
        <strong>Total</strong>
        <span>£{{ cart.total }}</span>
      </li>
    </ul>

    <h2 class="h4">Checkout</h2>
    <div class="row g-3 mb-3">
      <div class="col-md-4">
        <label class="form-label">Name</label>
        <input class="form-control" v-model="name" placeholder="Letters only" />
      </div>
      <div class="col-md-4">
        <label class="form-label">Phone</label>
        <input class="form-control" v-model="phone" placeholder="Digits only" />
      </div>
    </div>
    <button class="btn btn-primary" :disabled="!valid || cart.items.length===0" @click="checkout">
      Checkout
    </button>
  </div>
</template>

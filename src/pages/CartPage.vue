<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-8">
        <h4>Your Cart</h4>

        <div v-if="cart.items.length === 0" class="text-muted">Cart is empty</div>

        <div class="row" v-else>
          <div class="col-sm-6 mb-3" v-for="it in cart.items" :key="it._id">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ it.topic }}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{{ it.location }}</h6>
                <p class="card-text">Price: £{{ it.price }} × {{ it.qty }}</p>
                <p class="card-text">Subtotal: £{{ (Number(it.price) || 0) * it.qty }}</p>
                <button class="btn btn-danger btn-sm" @click="cart.remove(it._id)">Remove</button>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-3">
          <h5>Total: £{{ cart.total }}</h5>
        </div>
      </div>

      <aside class="col-md-4">
        <h4>Checkout</h4>

        <div class="mb-3">
          <label class="form-label">Name</label>
          <input v-model="name" type="text" class="form-control" />
        </div>

        <div class="mb-3">
          <label class="form-label">Phone</label>
          <input v-model="phone" type="text" class="form-control" />
        </div>

        <button
          class="btn btn-primary"
          :disabled="!valid || cart.items.length === 0"
          @click="checkout"
        >
          Checkout
        </button>

        <div v-if="message" class="alert alert-success mt-3" role="alert">
          {{ message }}
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { cart } from '../store/cart.js';
import { nameOk, phoneOk } from '../utils/validation.js';
import { createOrder } from '../api.js';

const name = ref('');
const phone = ref('');
const message = ref('');

const valid = computed(() => nameOk(name.value) && phoneOk(phone.value));

async function checkout() {
  if (cart.items.length === 0 || !valid.value) return;
  try {
    const items = cart.items.map(i => ({ lessonId: i._id, qty: i.qty }));
    const payload = { name: name.value, phone: phone.value, items };
    const res = await createOrder(payload);
    const id = res._id ?? res.id ?? 'unknown';
    message.value = `Order submitted (id: ${id})`;
    cart.clear();
    name.value = '';
    phone.value = '';
  } catch (err) {
    message.value = `Error: ${err?.message ?? 'failed to submit order'}`;
  }
}
</script>

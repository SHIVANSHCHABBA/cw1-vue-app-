import { reactive, computed } from 'vue';

const state = reactive({ items: [] });

const total = computed(() =>
  state.items.reduce((sum, it) => sum + (Number(it.price) || 0) * (it.qty || 0), 0)
);

function add(lesson) {
  const existing = state.items.find(i => i._id === lesson._id);
  if (existing) {
    existing.qty = (existing.qty || 0) + 1;
    return;
  }
  state.items.push({
    _id: lesson._id,
    topic: lesson.topic,
    location: lesson.location,
    price: lesson.price,
    qty: 1
  });
}

function remove(id) {
  const idx = state.items.findIndex(i => i._id === id);
  if (idx !== -1) state.items.splice(idx, 1);
}

function clear() {
  state.items.length = 0;
}

export const cart = {
  items: state.items,
  add,
  remove,
  clear,
  total
};

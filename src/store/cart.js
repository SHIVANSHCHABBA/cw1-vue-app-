import { reactive, computed } from 'vue'

const state = reactive({
  items: [] // {_id, topic, location, price, qty}
})

export const cart = {
  items: state.items,
  add(lesson) {
    const found = state.items.find(i => i._id === lesson._id)
    if (found) found.qty += 1
    else state.items.push({
      _id: lesson._id,
      topic: lesson.topic,
      location: lesson.location,
      price: lesson.price,
      qty: 1
    })
  },
  remove(id) {
    const i = state.items.findIndex(x => x._id === id)
    if (i >= 0) state.items.splice(i, 1)
  },
  clear() {
    state.items.splice(0)
  },
  total: computed(() => state.items.reduce((s, i) => s + i.price * i.qty, 0))
}

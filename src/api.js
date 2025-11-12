// src/api.js
const BASE = import.meta.env.VITE_API_URL; // must be set in .env/.env.production

export const getLessons = () =>
  fetch(`${BASE}/lessons`).then(r => r.json());

export const searchLessons = q =>
  fetch(`${BASE}/search?q=` + encodeURIComponent(q)).then(r => r.json());

export const updateLesson = (id, patch) =>
  fetch(`${BASE}/lessons/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch)
  }).then(r => r.json());

export const createOrder = (payload) =>
  fetch(`${BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(async r => {
    if (!r.ok) throw new Error((await r.json()).error || 'Order failed');
    return r.json();
  });
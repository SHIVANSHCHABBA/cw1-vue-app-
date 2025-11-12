const BASE = import.meta.env.VITE_API_URL;

export function getLessons() {
	return fetch(`${BASE}/lessons`).then(r => r.json());
}

export function searchLessons(q) {
	const u = new URL(`${BASE}/search`);
	u.searchParams.set('q', q);
	return fetch(u).then(r => r.json());
}

export function createOrder(payload) {
	return fetch(`${BASE}/orders`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	}).then(async r => {
		if (!r.ok) throw new Error((await r.json()).error || 'Order failed');
		return r.json();
	});
}

export function updateLesson(id, patch) {
	return fetch(`${BASE}/lessons/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(patch)
	}).then(r => r.json());
}

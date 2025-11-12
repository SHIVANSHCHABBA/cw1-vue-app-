const BASE = import.meta.env.VITE_API_URL;

export function getLessons() {
	return window.fetch(`${BASE}/lessons`)
		.then(res => res.json());
}

export function searchLessons(q) {
	const url = `${BASE}/search?q=${encodeURIComponent(q)}`;
	return window.fetch(url)
		.then(res => res.json());
}

function handleJsonResponseOrThrow(res) {
	return res.json().then(body => {
		if (!res.ok) {
			const err = new Error(`Request failed: ${res.status} ${res.statusText}`);
			err.response = res;
			err.body = body;
			throw err;
		}
		return body;
	});
}

export function updateLesson(id, patch) {
	return window.fetch(`${BASE}/lessons/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(patch)
	}).then(handleJsonResponseOrThrow);
}

export function createOrder(payload) {
	return window.fetch(`${BASE}/orders`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	}).then(handleJsonResponseOrThrow);
}

// API utility for backend requests
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000/api';

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function login(email, password) {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}

export async function signup(name, email, password) {
  return apiFetch('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password })
  });
}

export async function getProfile(token) {
  return apiFetch('/users/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
}
// Add more API helpers as needed

import axios from 'axios';

// One axios instance, shared by every feature. If we called axios.get(...)
// directly all over the app, every single call site would need to repeat
// the base URL and the "attach the token" logic below. Centralizing it here
// means we do it once and every feature just imports this.
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: runs before every request leaves the browser.
// Most endpoints (wallets, transactions, /auth/me, ...) require a JWT in
// the Authorization header. Rather than manually attaching it in every
// function that calls the API, we read it from localStorage here, once,
// for every request automatically.
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;

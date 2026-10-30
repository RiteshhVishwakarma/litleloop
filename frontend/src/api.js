import axios from 'axios'

const api = axios.create({
  baseURL: '/api/auth',
  withCredentials: true,   // send session cookie & CSRF cookie
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
})

// Fetch CSRF cookie once on startup so POST requests work
api.get('/csrf/').catch(() => {})

export default api

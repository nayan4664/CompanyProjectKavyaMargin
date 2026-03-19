import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Employee Services
export const employeeAPI = {
  getAll: () => api.get('/employees'),
  getById: (id) => api.get(`/employees/${id}`),
  create: (data) => api.post('/employees', data),
  update: (id, data) => api.put(`/employees/${id}`, data),
  delete: (id) => api.delete(`/employees/${id}`)
};

// Auth Services
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

// Bench Services
export const benchAPI = {
  getAll: () => api.get('/bench'),
  create: (data) => api.post('/bench', data),
  update: (id, data) => api.put(`/bench/${id}`, data),
  delete: (id) => api.delete(`/bench/${id}`)
};

// Invoice Services
export const invoiceAPI = {
  getAll: () => api.get('/invoices'),
  getById: (id) => api.get(`/invoices/${id}`),
  create: (data) => api.post('/invoices', data),
  update: (id, data) => api.put(`/invoices/${id}`, data),
  delete: (id) => api.delete(`/invoices/${id}`)
};

// Company Services
export const companyAPI = {
  get: () => api.get('/company'),
  update: (data) => api.put('/company', data)
};

// Dashboard Services
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats')
};

// Forecast Services
export const forecastAPI = {
  getProjections: () => api.get('/forecast/projections')
};

export default api;

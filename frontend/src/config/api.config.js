// Configuración global de la API

// URL base del backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Endpoints de la API
export const API_ENDPOINTS = {
  // Autenticación
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REFRESH: `${API_BASE_URL}/auth/refresh`,
  },

  // Usuarios
  USERS: {
    BASE: `${API_BASE_URL}/users`,
    BY_ID: (id) => `${API_BASE_URL}/users/${id}`,
    PROFILE: `${API_BASE_URL}/users/profile`,
    UPDATE: (id) => `${API_BASE_URL}/users/${id}`,
    DELETE: (id) => `${API_BASE_URL}/users/${id}`,
  },

  // Publicaciones
  POSTS: {
    BASE: `${API_BASE_URL}/publicacion`,
    BY_ID: (id) => `${API_BASE_URL}/publicacion/${id}`,
    CREATE: `${API_BASE_URL}/publicacion`,
    UPDATE: (id) => `${API_BASE_URL}/publicacion/${id}`,
    DELETE: (id) => `${API_BASE_URL}/publicacion/${id}`,
    BY_USER: (userId) => `${API_BASE_URL}/publicacion/user/${userId}`,
  },
};

// Configuración de timeouts
export const API_CONFIG = {
  TIMEOUT: 10000, // 10 segundos
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 segundo
};

export default API_ENDPOINTS;

import axios from 'axios'

// Instancia de Axios configurada para el backend
const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});

// Interceptor de respuesta 
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la solicitud:', error.response || error.message);
    return Promise.reject(error);
  }
);

export { api }


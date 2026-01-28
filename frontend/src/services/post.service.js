import api from './api';

export const PostService = {
  // Obtener todas las publicaciones
  getAll: async () => {
    const response = await api.get('/publicacion');
    return response.data;
  },

  // Obtener una publicación por ID
  getById: async (id) => {
    const response = await api.get(`/publicacion/${id}`);
    return response.data;
  },

  // Crear una nueva publicación
  create: async (data) => {
    const response = await api.post('/publicacion', data);
    return response.data;
  },

  // Actualizar una publicación
  update: async (id, data) => {
    const response = await api.patch(`/publicacion/${id}`, data);
    return response.data;
  },

  // Eliminar una publicación
  delete: async (id) => {
    const response = await api.delete(`/publicacion/${id}`);
    return response.data;
  }
};

export default PostService;

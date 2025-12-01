import api from './api';

const portfolioService = {
  // Obtener perfil público
  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data.data;
  },

  // Obtener proyectos
  getProjects: async (params = {}) => {
    const response = await api.get('/projects', { params });
    return response.data.data;
  },

  // Obtener proyecto por ID
  getProjectById: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data.data;
  },

  // Obtener experiencias
  getExperiences: async () => {
    const response = await api.get('/experiences');
    return response.data.data;
  },

  // Obtener educación
  getEducation: async () => {
    const response = await api.get('/education');
    return response.data.data;
  },

  // Obtener certificaciones
  getCertifications: async () => {
    const response = await api.get('/certifications');
    return response.data.data;
  }
};

export default portfolioService;









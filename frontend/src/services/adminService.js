import api from './api';

// Helper genérico para hacer requests
const request = async (method, url, data = null) => {
  try {
    const response = await api({
      method,
      url,
      data
    });

    // Muchos endpoints devuelven { data: {...} }, otros no.
    return response.data?.data ?? response.data;
  } catch (error) {
    console.error(`API Error [${method.toUpperCase()} ${url}]:`, error);

    // Opcional: podés lanzar un error más claro
    throw error.response?.data ?? error;
  }
};

const adminService = {
  // ============ PROFILE ============
  updateProfile: (data) => request('put', '/profile', data),

  // ============ PROJECTS ============
  createProject: (data) => request('post', '/projects', data),
  updateProject: (id, data) => request('put', `/projects/${id}`, data),
  deleteProject: (id) => request('delete', `/projects/${id}`),

  // ============ EXPERIENCE ============
  createExperience: (data) => request('post', '/experiences', data),
  updateExperience: (id, data) => request('put', `/experiences/${id}`, data),
  deleteExperience: (id) => request('delete', `/experiences/${id}`),

  // ============ EDUCATION ============
  createEducation: (data) => request('post', '/education', data),
  updateEducation: (id, data) => request('put', `/education/${id}`, data),
  deleteEducation: (id) => request('delete', `/education/${id}`),

  // ============ CERTIFICATIONS ============
  createCertification: (data) => request('post', '/certifications', data),
  updateCertification: (id, data) => request('put', `/certifications/${id}`, data),
  deleteCertification: (id) => request('delete', `/certifications/${id}`)
};

export default adminService;

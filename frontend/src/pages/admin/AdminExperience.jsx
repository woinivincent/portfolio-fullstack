import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoAdd, IoTrash, IoCreate, IoClose, IoSave, IoBriefcase } from 'react-icons/io5';
import toast from 'react-hot-toast';
import portfolioService from '../../services/portfolioService';
import adminService from '../../services/adminService';
import { Modal, Button, Input, Loading } from '../../components/common';

const AdminExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    responsibilities: '',
    technologies: ''
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const data = await portfolioService.getExperiences();
      setExperiences(data || []);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      toast.error('Error al cargar experiencias');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (experience = null) => {
    if (experience) {
      setEditingExperience(experience);
      setFormData({
        title: experience.title,
        company: experience.company,
        location: experience.location || '',
        startDate: experience.startDate?.split('T')[0] || '',
        endDate: experience.endDate?.split('T')[0] || '',
        current: experience.current || false,
        description: experience.description || '',
        responsibilities: Array.isArray(experience.responsibilities) 
          ? experience.responsibilities.join('\n') 
          : experience.responsibilities || '',
        technologies: Array.isArray(experience.technologies)
          ? experience.technologies.join(', ')
          : experience.technologies || ''
      });
    } else {
      setEditingExperience(null);
      setFormData({
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        responsibilities: '',
        technologies: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingExperience(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const experienceData = {
      ...formData,
      responsibilities: formData.responsibilities.split('\n').filter(r => r.trim()),
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(t => t)
    };

    try {
      if (editingExperience) {
        await adminService.updateExperience(editingExperience._id, experienceData);
        toast.success('Experiencia actualizada correctamente');
      } else {
        await adminService.createExperience(experienceData);
        toast.success('Experiencia creada correctamente');
      }
      handleCloseModal();
      fetchExperiences();
    } catch (error) {
      console.error('Error saving experience:', error);
      toast.error(error.response?.data?.message || 'Error al guardar experiencia');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta experiencia?')) return;

    try {
      await adminService.deleteExperience(id);
      toast.success('Experiencia eliminada correctamente');
      fetchExperiences();
    } catch (error) {
      console.error('Error deleting experience:', error);
      toast.error('Error al eliminar experiencia');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
  };

  if (loading) {
    return <Loading text="Cargando experiencias..." />;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Experiencia</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Gestiona tu experiencia laboral
          </p>
        </div>
        <Button
          variant="primary"
          icon={IoAdd}
          onClick={() => handleOpenModal()}
        >
          Nueva Experiencia
        </Button>
      </div>

      {/* Timeline */}
      {experiences.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <IoBriefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No hay experiencias registradas aún
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-grow">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0">
                      <IoBriefcase className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {exp.title}
                      </h3>
                      <p className="text-primary-500 font-medium">{exp.company}</p>
                      {exp.location && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">{exp.location}</p>
                      )}
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {formatDate(exp.startDate)} - {exp.current ? 'Presente' : formatDate(exp.endDate)}
                        {exp.current && (
                          <span className="ml-2 px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs">
                            Actual
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  {exp.description && (
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {exp.description}
                    </p>
                  )}

                  {/* Responsibilities */}
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Responsabilidades:
                      </h4>
                      <ul className="list-disc list-inside space-y-1">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleOpenModal(exp)}
                    className="p-2 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                  >
                    <IoCreate className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <IoTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingExperience ? 'Editar Experiencia' : 'Nueva Experiencia'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Título del Puesto"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Senior Developer"
          />

          <Input
            label="Empresa"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            placeholder="Tech Company Inc."
          />

          <Input
            label="Ubicación"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Buenos Aires, Argentina"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fecha Inicio
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fecha Fin
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                disabled={formData.current}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="current"
              name="current"
              checked={formData.current}
              onChange={handleChange}
              className="w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="current" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Trabajo actual
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Descripción general del puesto..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Responsabilidades (una por línea)
            </label>
            <textarea
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
              rows="5"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Desarrollo de aplicaciones web&#10;Gestión de bases de datos&#10;Code reviews"
            />
          </div>

          <Input
            label="Tecnologías (separadas por coma)"
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
          />

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              variant="primary"
              icon={IoSave}
              className="flex-1"
            >
              {editingExperience ? 'Actualizar' : 'Crear'} Experiencia
            </Button>
            <Button
              type="button"
              variant="outline"
              icon={IoClose}
              onClick={handleCloseModal}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminExperience;
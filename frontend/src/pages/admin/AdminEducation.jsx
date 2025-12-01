import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoAdd, IoTrash, IoCreate, IoClose, IoSave, IoSchool } from 'react-icons/io5';
import toast from 'react-hot-toast';
import portfolioService from '../../services/portfolioService';
import adminService from '../../services/adminService';
import { Modal, Button, Input, Loading } from '../../components/common';

const AdminEducation = () => {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    achievements: '',
    gpa: ''
  });

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      setLoading(true);
      const data = await portfolioService.getEducation();
      setEducations(data || []);
    } catch (error) {
      console.error('Error fetching education:', error);
      toast.error('Error al cargar educación');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (education = null) => {
    if (education) {
      setEditingEducation(education);
      setFormData({
        degree: education.degree,
        institution: education.institution,
        location: education.location || '',
        startDate: education.startDate?.split('T')[0] || '',
        endDate: education.endDate?.split('T')[0] || '',
        current: education.current || false,
        description: education.description || '',
        achievements: Array.isArray(education.achievements) 
          ? education.achievements.join('\n') 
          : education.achievements || '',
        gpa: education.gpa || ''
      });
    } else {
      setEditingEducation(null);
      setFormData({
        degree: '',
        institution: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        achievements: '',
        gpa: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEducation(null);
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

    const educationData = {
      ...formData,
      achievements: formData.achievements.split('\n').filter(a => a.trim())
    };

    try {
      if (editingEducation) {
        await adminService.updateEducation(editingEducation._id, educationData);
        toast.success('Educación actualizada correctamente');
      } else {
        await adminService.createEducation(educationData);
        toast.success('Educación creada correctamente');
      }
      handleCloseModal();
      fetchEducations();
    } catch (error) {
      console.error('Error saving education:', error);
      toast.error(error.response?.data?.message || 'Error al guardar educación');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta educación?')) return;

    try {
      await adminService.deleteEducation(id);
      toast.success('Educación eliminada correctamente');
      fetchEducations();
    } catch (error) {
      console.error('Error deleting education:', error);
      toast.error('Error al eliminar educación');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
  };

  if (loading) {
    return <Loading text="Cargando educación..." />;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Educación</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Gestiona tu formación académica
          </p>
        </div>
        <Button
          variant="primary"
          icon={IoAdd}
          onClick={() => handleOpenModal()}
        >
          Nueva Educación
        </Button>
      </div>

      {/* Education List */}
      {educations.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <IoSchool className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No hay registros de educación aún
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {educations.map((edu, index) => (
            <motion.div
              key={edu._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-grow">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <IoSchool className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {edu.degree}
                      </h3>
                      <p className="text-primary-500 font-medium">{edu.institution}</p>
                      {edu.location && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">{edu.location}</p>
                      )}
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {formatDate(edu.startDate)} - {edu.current ? 'En curso' : formatDate(edu.endDate)}
                        {edu.current && (
                          <span className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                            En curso
                          </span>
                        )}
                      </p>
                      {edu.gpa && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Promedio: <span className="font-semibold text-gray-700 dark:text-gray-300">{edu.gpa}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  {edu.description && (
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {edu.description}
                    </p>
                  )}

                  {/* Achievements */}
                  {edu.achievements && edu.achievements.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Logros:
                      </h4>
                      <ul className="list-disc list-inside space-y-1">
                        {edu.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleOpenModal(edu)}
                    className="p-2 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                  >
                    <IoCreate className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(edu._id)}
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
        title={editingEducation ? 'Editar Educación' : 'Nueva Educación'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Título o Grado"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            required
            placeholder="Ingeniería en Sistemas"
          />

          <Input
            label="Institución"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            required
            placeholder="Universidad Tecnológica Nacional"
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
              Estudio en curso
            </label>
          </div>

          <Input
            label="Promedio/GPA (opcional)"
            name="gpa"
            value={formData.gpa}
            onChange={handleChange}
            placeholder="9.5 / 4.0"
          />

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
              placeholder="Descripción de la formación..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Logros (uno por línea)
            </label>
            <textarea
              name="achievements"
              value={formData.achievements}
              onChange={handleChange}
              rows="5"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Mejor promedio de la promoción&#10;Proyecto final con mención especial&#10;Becado por excelencia académica"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              variant="primary"
              icon={IoSave}
              className="flex-1"
            >
              {editingEducation ? 'Actualizar' : 'Crear'} Educación
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

export default AdminEducation;
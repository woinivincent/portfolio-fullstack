import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoAdd, IoTrash, IoCreate, IoClose, IoSave, IoRibbon, IoLink } from 'react-icons/io5';
import toast from 'react-hot-toast';
import portfolioService from '../../services/portfolioService';
import adminService from '../../services/adminService';
import { Modal, Button, Input, Loading } from '../../components/common';

const AdminCertifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCertification, setEditingCertification] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    credentialUrl: '',
    description: '',
    skills: ''
  });

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      const data = await portfolioService.getCertifications();
      setCertifications(data || []);
    } catch (error) {
      console.error('Error fetching certifications:', error);
      toast.error('Error al cargar certificaciones');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (certification = null) => {
    if (certification) {
      setEditingCertification(certification);
      setFormData({
        name: certification.name,
        issuer: certification.issuer,
        issueDate: certification.issueDate?.split('T')[0] || '',
        expiryDate: certification.expiryDate?.split('T')[0] || '',
        credentialId: certification.credentialId || '',
        credentialUrl: certification.credentialUrl || '',
        description: certification.description || '',
        skills: Array.isArray(certification.skills)
          ? certification.skills.join(', ')
          : certification.skills || ''
      });
    } else {
      setEditingCertification(null);
      setFormData({
        name: '',
        issuer: '',
        issueDate: '',
        expiryDate: '',
        credentialId: '',
        credentialUrl: '',
        description: '',
        skills: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCertification(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   const certificationData = {
  ...formData,
  date: formData.issueDate, // <-- Campo requerido por el backend
  issueDate: formData.issueDate || undefined,
  expiryDate: formData.expiryDate || undefined,
  skills: formData.skills
    .split(',')
    .map(s => s.trim())
    .filter(s => s)
};
    try {
      if (editingCertification) {
        await adminService.updateCertification(editingCertification._id, certificationData);
        toast.success('Certificación actualizada correctamente');
      } else {
        await adminService.createCertification(certificationData);
        toast.success('Certificación creada correctamente');
      }
      handleCloseModal();
      fetchCertifications();
    } catch (error) {
      console.error('Error saving certification:', error);
      toast.error(error.response?.data?.message || 'Error al guardar certificación');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta certificación?')) return;

    try {
      await adminService.deleteCertification(id);
      toast.success('Certificación eliminada correctamente');
      fetchCertifications();
    } catch (error) {
      console.error('Error deleting certification:', error);
      toast.error('Error al eliminar certificación');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
  };

  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  if (loading) {
    return <Loading text="Cargando certificaciones..." />;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Certificaciones</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Gestiona tus certificaciones y cursos
          </p>
        </div>
        <Button
          variant="primary"
          icon={IoAdd}
          onClick={() => handleOpenModal()}
        >
          Nueva Certificación
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Total Certificaciones</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{certifications.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Activas</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {certifications.filter(c => !isExpired(c.expiryDate)).length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Vencidas</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {certifications.filter(c => isExpired(c.expiryDate)).length}
          </p>
        </div>
      </div>

      {/* Certifications Grid */}
      {certifications.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <IoRibbon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No hay certificaciones registradas aún
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                  <IoRibbon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                    {cert.name}
                  </h3>
                  <p className="text-primary-500 font-medium text-sm">{cert.issuer}</p>
                </div>
              </div>

              {/* Date */}
              <div className="mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Emitida: {formatDate(cert.issueDate)}
                </p>
                {cert.expiryDate && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {isExpired(cert.expiryDate) ? 'Venció' : 'Vence'}: {formatDate(cert.expiryDate)}
                    {isExpired(cert.expiryDate) && (
                      <span className="ml-2 px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full text-xs">
                        Vencida
                      </span>
                    )}
                  </p>
                )}
              </div>

              {/* Description */}
              {cert.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {cert.description}
                </p>
              )}

              {/* Skills */}
              {cert.skills && cert.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {cert.skills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                      +{cert.skills.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Credential Info */}
              {cert.credentialId && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  ID: {cert.credentialId}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-primary-500 hover:text-primary-600"
                  >
                    <IoLink className="w-4 h-4" />
                    Ver credencial
                  </a>
                )}
                <div className="flex-grow"></div>
                <button
                  onClick={() => handleOpenModal(cert)}
                  className="p-2 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                >
                  <IoCreate className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(cert._id)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <IoTrash className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingCertification ? 'Editar Certificación' : 'Nueva Certificación'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Nombre de la Certificación"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Certified Ethical Hacker (CEH)"
          />

          <Input
            label="Organización Emisora"
            name="issuer"
            value={formData.issuer}
            onChange={handleChange}
            required
            placeholder="EC-Council"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fecha de Emisión
              </label>
              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fecha de Vencimiento (opcional)
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <Input
            label="ID de Credencial (opcional)"
            name="credentialId"
            value={formData.credentialId}
            onChange={handleChange}
            placeholder="ABC123456789"
          />

          <Input
            label="URL de Credencial (opcional)"
            name="credentialUrl"
            value={formData.credentialUrl}
            onChange={handleChange}
            placeholder="https://verify.example.com/ABC123456789"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Descripción de la certificación y lo que abarca..."
            />
          </div>

          <Input
            label="Habilidades (separadas por coma)"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Ethical Hacking, Penetration Testing, Network Security"
          />

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              variant="primary"
              icon={IoSave}
              className="flex-1"
            >
              {editingCertification ? 'Actualizar' : 'Crear'} Certificación
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

export default AdminCertifications;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IoAdd, 
  IoTrash, 
  IoCreate, 
  IoEye, 
  IoClose,
  IoSave,
  IoSearch,
  IoLogoGithub,
  IoGlobeOutline
} from 'react-icons/io5';
import toast from 'react-hot-toast';
import portfolioService from '../../services/portfolioService';
import adminService from '../../services/adminService';
import { Modal, Button, Input, Loading } from '../../components/common';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    technologies: '',
    category: 'fullstack',
    githubUrl: '',
    liveUrl: '',
    featured: false
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await portfolioService.getProjects();
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Error al cargar proyectos');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        image: project.image || '',
        technologies: Array.isArray(project.technologies) 
          ? project.technologies.join(', ') 
          : project.technologies,
        category: project.category || 'fullstack',
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || '',
        featured: project.featured || false
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        image: '',
        technologies: '',
        category: 'fullstack',
        githubUrl: '',
        liveUrl: '',
        featured: false
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProject(null);
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

    const projectData = {
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim())
    };

    try {
      if (editingProject) {
        await adminService.updateProject(editingProject._id, projectData);
        toast.success('Proyecto actualizado correctamente');
      } else {
        await adminService.createProject(projectData);
        toast.success('Proyecto creado correctamente');
      }
      handleCloseModal();
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error(error.response?.data?.message || 'Error al guardar proyecto');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este proyecto?')) return;

    try {
      await adminService.deleteProject(id);
      toast.success('Proyecto eliminado correctamente');
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Error al eliminar proyecto');
    }
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loading text="Cargando proyectos..." />;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Proyectos</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Gestiona tus proyectos destacados
          </p>
        </div>
        <Button
          variant="primary"
          icon={IoAdd}
          onClick={() => handleOpenModal()}
        >
          Nuevo Proyecto
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar proyectos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Total Proyectos</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{projects.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Destacados</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {projects.filter(p => p.featured).length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Categorías</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {[...new Set(projects.map(p => p.category))].length}
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No hay proyectos aún. ¡Crea el primero!
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              {/* Project Image */}
              <div className="h-48 bg-gradient-to-br from-primary-500 to-secondary-500 relative">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover opacity-90"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold opacity-30">
                    {project.title.charAt(0)}
                  </div>
                )}
                {project.featured && (
                  <span className="absolute top-3 right-3 px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
                    Destacado
                  </span>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 truncate">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Category Badge */}
                <div className="mb-4">
                  <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium">
                    {project.category}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(project)}
                    className="flex-1 py-2 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <IoCreate className="w-4 h-4" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <IoTrash className="w-4 h-4" />
                  </button>
                </div>

                {/* Links */}
                {(project.githubUrl || project.liveUrl) && (
                  <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-primary-500 text-sm"
                      >
                        <IoLogoGithub className="w-4 h-4" />
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-primary-500 text-sm"
                      >
                        <IoGlobeOutline className="w-4 h-4" />
                        Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <Input
            label="Título"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Nombre del proyecto"
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Describe tu proyecto..."
            />
          </div>

          {/* Image URL */}
          <Input
            label="URL de Imagen"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://ejemplo.com/imagen.jpg"
          />

          {/* Technologies */}
          <Input
            label="Tecnologías (separadas por coma)"
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            required
            placeholder="React, Node.js, MongoDB"
          />

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Categoría
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="fullstack">Full-Stack</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="security">Seguridad</option>
            </select>
          </div>

          {/* GitHub URL */}
          <Input
            label="URL de GitHub"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            placeholder="https://github.com/usuario/proyecto"
          />

          {/* Live URL */}
          <Input
            label="URL de Demo"
            name="liveUrl"
            value={formData.liveUrl}
            onChange={handleChange}
            placeholder="https://proyecto-demo.com"
          />

          {/* Featured */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="featured" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Marcar como destacado
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              variant="primary"
              icon={IoSave}
              className="flex-1"
            >
              {editingProject ? 'Actualizar' : 'Crear'} Proyecto
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

export default AdminProjects;
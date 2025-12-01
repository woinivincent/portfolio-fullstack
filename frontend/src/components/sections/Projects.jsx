import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoLogoGithub, IoGlobeOutline, IoArrowForward } from 'react-icons/io5';
import portfolioService from '../../services/portfolioService';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await portfolioService.getProjects({ featured: true });
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects(mockProjects);
    } finally {
      setLoading(false);
    }
  };

  const mockProjects = [
    {
      _id: '1',
      title: 'Portfolio Profesional',
      description: 'Portfolio con panel de administración completo desarrollado con MERN Stack.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
      technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
      category: 'fullstack',
      githubUrl: 'https://github.com/woinivincent',
      liveUrl: '#',
      featured: true
    },
    {
      _id: '2',
      title: 'Security Scanner',
      description: 'Herramienta de análisis de vulnerabilidades web basada en OWASP Top 10.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop',
      technologies: ['Python', 'Flask', 'Docker'],
      category: 'security',
      githubUrl: 'https://github.com/woinivincent',
      featured: true
    },
    {
      _id: '3',
      title: 'E-Commerce Platform',
      description: 'Plataforma de comercio electrónico con pasarela de pagos integrada.',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop',
      technologies: ['.NET Core', 'React', 'PostgreSQL'],
      category: 'fullstack',
      githubUrl: 'https://github.com/woinivincent',
      liveUrl: '#',
      featured: true
    },
  ];

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'fullstack', name: 'Full-Stack' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'security', name: 'Seguridad' },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  if (loading) {
    return (
      <section id="projects" className="py-32 bg-gray-600 dark:bg-dark-surface">
        <div className="section-container flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-32 bg-gray-600 dark:bg-dark-surface relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl"></div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-mono text-primary-600 dark:text-primary-400 mb-4 block">
            /proyectos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Proyectos Destacados
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Selección de trabajos realizados
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto mt-4"></div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === category.id
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                  : 'bg-gray-600 dark:bg-dark-card text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-dark-border hover:border-primary-600 dark:hover:border-primary-400'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-gray-600 dark:bg-dark-card rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-border hover:border-primary-600 dark:hover:border-primary-400 transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-600 dark:bg-dark-surface text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-gray-600 dark:bg-dark-surface text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Action Links */}
                <div className="flex gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                    >
                      <IoLogoGithub className="w-4 h-4" />
                      Código
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                    >
                      <IoGlobeOutline className="w-4 h-4" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects */}
        {filteredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <a
              href="https://github.com/woinivincent"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-gray-600 text-white dark:text-gray-50 rounded-lg font-bold hover:scale-105 transition-all shadow-lg"
            >
              <IoLogoGithub className="w-6 h-6" />
              Ver más en GitHub
              <IoArrowForward className="w-5 h-5" />
            </a>
          </motion.div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No hay proyectos en esta categoría.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
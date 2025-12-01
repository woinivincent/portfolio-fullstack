import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoShieldCheckmark, IoCodeSlash, IoRocket, IoSchool } from 'react-icons/io5';
import portfolioService from '../../services/portfolioService';

const About = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await portfolioService.getProfile();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const highlights = [
    {
      icon: IoCodeSlash,
      title: 'Full-Stack Development',
      description: 'MERN Stack, .NET Core, PHP',
    },
    {
      icon: IoShieldCheckmark,
      title: 'Ciberseguridad',
      description: 'Seguridad de aplicaciones web',
    },
    {
      icon: IoRocket,
      title: 'Siempre Aprendiendo',
      description: 'Nuevas tecnologías constantemente',
    },
    {
      icon: IoSchool,
      title: 'Educación',
      description: 'Ingeniería en Sistemas',
    },
  ];

  if (loading) {
    return (
      <section id="about" className="py-32 bg-gray-50 dark:bg-dark-surface">
        <div className="section-container flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-32 bg-gray-50 dark:bg-dark-surface relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl"></div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-mono text-primary-600 dark:text-primary-400 mb-4 block">
            /sobre-mi
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Sobre Mí
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Decorative Border */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl opacity-20 blur-xl"></div>
              
              {/* Image Container */}
              <div className="relative bg-gray-600 dark:bg-dark-card rounded-2xl p-2 border border-gray-400 dark:border-dark-border">
                <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
                  {profile?.profileImage ? (
                    <img 
                      src={profile.profileImage} 
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-40 h-40 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center text-white text-6xl font-bold">
                        {profile?.name?.split(' ').map(n => n[0]).join('') || 'VW'}
                      </div>
                    </div>
                  )}
                </div>
              </div>

             
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              {profile?.name || 'Vicente Woinilowicz'}
            </h3>
            
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              {profile?.bio ? (
                <p className="text-lg">{profile.bio}</p>
              ) : (
                <>
                  <p>
                    Desarrollador Full-Stack apasionado por la tecnología y la
                    ciberseguridad. Actualmente estudiando Ingeniería en Sistemas y
                    especializándome en desarrollo web seguro.
                  </p>
                  <p>
                    Mi enfoque principal está en crear aplicaciones web robustas,
                    escalables y sobre todo, seguras. Trabajo con tecnologías modernas
                    como React, Node.js, MongoDB, y .NET Core.
                  </p>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#contact"
                className="btn btn-primary"
              >
                Contactar
              </a>
              {profile?.cvUrl && (
                <a
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  Descargar CV
                </a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-gray-700 dark:bg-dark-card rounded-xl p-6 border border-gray-200 dark:border-dark-border hover:border-primary-600 dark:hover:border-primary-400 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              
              {/* Content */}
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 to-secondary-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        {profile?.stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center p-6 rounded-xl bg-gray-700 dark:bg-dark-card border border-gray-200 dark:border-dark-border">
              <p className="text-5xl font-bold gradient-text mb-2">
                {profile.stats.yearsExperience}+
              </p>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Años de Experiencia</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-700 dark:bg-dark-card border border-gray-200 dark:border-dark-border">
              <p className="text-5xl font-bold gradient-text mb-2">
                {profile.stats.projectsCompleted}+
              </p>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Proyectos Completados</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-700 dark:bg-dark-card border border-gray-200 dark:border-dark-border">
              <p className="text-5xl font-bold gradient-text mb-2">
                {profile.stats.certifications}
              </p>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Certificaciones</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default About;
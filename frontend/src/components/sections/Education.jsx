import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoSchool, IoCalendar, IoLocation, IoTrophy } from 'react-icons/io5';
import portfolioService from '../../services/portfolioService';

const Education = () => {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      const data = await portfolioService.getEducation();
      setEducations(data || []);
    } catch (error) {
      console.error('Error fetching education:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'short' });
  };

  if (loading) {
    return (
      <section id="education" className="py-32 bg-gray-50 dark:bg-dark-surface">
        <div className="section-container flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  if (educations.length === 0) {
    return null;
  }

  return (
    <section id="education" className="py-32 bg-gray-50 dark:bg-dark-surface relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl"></div>

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
            /educacion
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Formación Académica
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Mi trayectoria educativa
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto mt-4"></div>
        </motion.div>

        {/* Education Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {educations.map((edu, index) => (
            <motion.div
              key={edu._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white dark:bg-dark-card rounded-2xl p-8 border border-gray-200 dark:border-dark-border hover:border-primary-600 dark:hover:border-primary-400 transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              {/* Icon and Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <IoSchool className="w-8 h-8 text-white" />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-lg text-primary-600 dark:text-primary-400 font-semibold mb-3">
                    {edu.institution}
                  </p>
                  
                  {/* Date and Location */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <IoCalendar className="w-4 h-4 flex-shrink-0" />
                      <span>
                        {formatDate(edu.startDate)} - {edu.current ? 'En curso' : formatDate(edu.endDate)}
                      </span>
                      {edu.current && (
                        <span className="ml-2 px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded text-xs font-semibold">
                          Cursando
                        </span>
                      )}
                    </div>
                    
                    {edu.location && (
                      <div className="flex items-center gap-2">
                        <IoLocation className="w-4 h-4 flex-shrink-0" />
                        <span>{edu.location}</span>
                      </div>
                    )}

                    {edu.gpa && (
                      <div className="flex items-center gap-2">
                        <IoTrophy className="w-4 h-4 flex-shrink-0 text-yellow-600" />
                        <span>Promedio: <span className="font-semibold text-gray-900 dark:text-white">{edu.gpa}</span></span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              {edu.description && (
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {edu.description}
                </p>
              )}

              {/* Achievements */}
              {edu.achievements && edu.achievements.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider flex items-center gap-2">
                    <IoTrophy className="w-4 h-4 text-yellow-600" />
                    Logros destacados
                  </h4>
                  <ul className="space-y-2">
                    {edu.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-2 flex-shrink-0"></span>
                        <span className="text-sm">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Decorative gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 to-secondary-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
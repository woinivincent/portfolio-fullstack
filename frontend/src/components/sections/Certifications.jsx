import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoRibbon, IoCalendar, IoCheckmarkCircle, IoLink } from 'react-icons/io5';
import portfolioService from '../../services/portfolioService';

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const data = await portfolioService.getCertifications();
      const activeCerts = (data || []).filter(cert => {
        if (!cert.expiryDate) return true;
        return new Date(cert.expiryDate) > new Date();
      });
      setCertifications(activeCerts);
    } catch (error) {
      console.error('Error fetching certifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
  };

  if (loading) {
    return (
      <section id="certifications" className="py-32 bg-gray-50 dark:bg-dark-surface">
        <div className="section-container flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  if (certifications.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="py-20 bg-gray-50 dark:bg-dark-surface relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>

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
            /certificaciones
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Certificaciones
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Certificaciones profesionales que validan mis conocimientos
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto mt-4"></div>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-gray-600 dark:bg-dark-card rounded-2xl p-6 border border-gray-200 dark:border-dark-border hover:border-primary-600 dark:hover:border-primary-400 transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              {/* Icon */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <IoRibbon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-primary-600 dark:text-primary-400 font-semibold">
                    {cert.issuer}
                  </p>
                </div>
              </div>

              {/* Description */}
              {cert.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                  {cert.description}
                </p>
              )}

              {/* Date */}
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
                <IoCalendar className="w-4 h-4" />
                <span>Emitida en {formatDate(cert.issueDate)}</span>
              </div>

              {/* Skills */}
              {cert.skills && cert.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {cert.skills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 dark:bg-dark-surface text-gray-700 dark:text-gray-300 rounded text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-dark-surface text-gray-700 dark:text-gray-300 rounded text-xs font-medium">
                      +{cert.skills.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Divider */}
              <div className="h-px bg-gray-400 dark:bg-dark-border mb-4"></div>

              {/* Credential Info */}
              <div>
                {cert.credentialId && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-mono">
                    ID: {cert.credentialId}
                  </p>
                )}

                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium transition-colors group/link"
                  >
                    <IoLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    Ver credencial
                  </a>
                ) : (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
                    <IoCheckmarkCircle className="w-4 h-4" />
                    Certificado verificado
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
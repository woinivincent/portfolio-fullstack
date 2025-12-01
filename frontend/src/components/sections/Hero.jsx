import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoLogoGithub, IoLogoLinkedin, IoMail, IoLogoWhatsapp, IoArrowForward } from 'react-icons/io5';
import portfolioService from '../../services/portfolioService';

const Hero = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await portfolioService.getProfile();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const getSocialLinks = () => {
    if (!profile?.socialLinks) {
      return [
        { icon: IoLogoGithub, href: 'https://github.com/woinivincent', label: 'GitHub' },
        { icon: IoLogoLinkedin, href: 'https://linkedin.com/in/vicente-woinilowicz-060b0627a', label: 'LinkedIn' },
        { icon: IoLogoWhatsapp, href: 'https://wa.me/5492323462300', label: 'WhatsApp' },
        { icon: IoMail, href: 'mailto:woinilowiczv@gmail.com', label: 'Email' },
      ];
    }

    const links = [];
    if (profile.socialLinks.github) links.push({ icon: IoLogoGithub, href: profile.socialLinks.github, label: 'GitHub' });
    if (profile.socialLinks.linkedin) links.push({ icon: IoLogoLinkedin, href: profile.socialLinks.linkedin, label: 'LinkedIn' });
    if (profile.socialLinks.whatsapp) links.push({ icon: IoLogoWhatsapp, href: profile.socialLinks.whatsapp, label: 'WhatsApp' });
    if (profile.socialLinks.email) links.push({ icon: IoMail, href: `mailto:${profile.socialLinks.email}`, label: 'Email' });
    return links;
  };

  const socialLinks = getSocialLinks();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-dark-bg">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 grid-pattern opacity-50"></div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"></div>

      <div className="section-container relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-full"
          >
            <span className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              Disponible para proyectos
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            {profile?.name || 'Vicente Woinilowicz'}
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <p className="text-2xl md:text-3xl font-light text-gray-600 dark:text-gray-400 mb-2">
              {profile?.title || 'Full-Stack Developer'}
            </p>
            <p className="text-xl text-gray-500 dark:text-gray-500 font-mono">
              {profile?.subtitle || '& Cybersecurity Specialist'}
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {profile?.description || 'Creando experiencias digitales excepcionales con código limpio y arquitecturas seguras.'}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center mb-16"
          >
            <a
              href="#projects"
              className="group btn btn-primary flex items-center gap-2"
            >
              Ver Proyectos
              <IoArrowForward className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="btn btn-secondary"
            >
              Contactar
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-4 justify-center"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-dark-surface border border-gray-200 dark:border-dark-border flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-600 dark:hover:border-primary-400 transition-all"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center text-gray-400 hover:text-primary-600 transition-colors"
          >
            <span className="text-xs mb-2 uppercase tracking-wider font-medium">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-2"
            >
              <motion.div className="w-1 h-2 bg-current rounded-full" />
            </motion.div>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
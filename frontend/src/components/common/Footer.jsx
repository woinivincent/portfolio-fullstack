import React from 'react';
import { Link } from 'react-router-dom';
import { IoShieldCheckmark, IoLogoGithub, IoLogoLinkedin, IoMail, IoLogoWhatsapp } from 'react-icons/io5';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { name: 'Inicio', path: '/' },
      { name: 'Proyectos', path: '/#projects' },
      { name: 'Experiencia', path: '/#experience' },
      { name: 'Contacto', path: '/#contact' },
    ],
    social: [
      { 
        name: 'GitHub', 
        icon: IoLogoGithub, 
        url: 'https://github.com/woinivincent',
        color: 'hover:text-gray-900 dark:hover:text-white'
      },
      { 
        name: 'LinkedIn', 
        icon: IoLogoLinkedin, 
        url: 'https://linkedin.com/in/vicente-woinilowicz-060b0627a',
        color: 'hover:text-blue-600'
      },
      { 
        name: 'WhatsApp', 
        icon: IoLogoWhatsapp, 
        url: 'https://wa.me/5492323462300',
        color: 'hover:text-green-500'
      },
      { 
        name: 'Email', 
        icon: IoMail, 
        url: 'mailto:woinilowiczv@gmail.com',
        color: 'hover:text-primary-500'
      },
    ],
  };

  return (
    <footer className="bg-white dark:bg-dark-surface border-t border-gray-200 dark:border-dark-border">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <IoShieldCheckmark className="w-8 h-8 text-primary-500" />
              <span className="text-xl font-bold gradient-text">
                Vicente<span className="text-gray-900 dark:text-white">.</span>dev
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Full-Stack Developer & Cybersecurity Specialist
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Creando aplicaciones seguras y eficientes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Sígueme
            </h3>
            <div className="flex gap-4">
              {footerLinks.social.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    p-2 rounded-lg
                    bg-gray-100 dark:bg-dark-border
                    text-gray-600 dark:text-gray-400
                    ${social.color}
                    transition-all
                    hover:scale-110
                  `}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-dark-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p>
              © {currentYear} Vicente Woinilowicz. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-2">
              <IoShieldCheckmark className="w-4 h-4 text-primary-500" />
              <span>Desarrollado con seguridad en mente</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
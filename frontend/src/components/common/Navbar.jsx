import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMenu, IoClose, IoShieldCheckmark, IoMoon, IoSunny } from 'react-icons/io5';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Sobre Mí', path: '/#about' },
    { name: 'Proyectos', path: '/#projects' },
    { name: 'Experiencia', path: '/#experience' },
    { name: 'Contacto', path: '/#contact' },
  ];

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-40
        transition-all duration-300
        ${scrolled 
          ? 'bg-white/80 dark:bg-dark-surface/80 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
        }
      `}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <IoShieldCheckmark className="w-8 h-8 text-primary-500 group-hover:rotate-12 transition-transform" />
            <span className="text-xl font-bold gradient-text">
              Vicente<span className="text-gray-900 dark:text-white">.</span>dev
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className={`
                  text-sm font-medium transition-colors
                  hover:text-primary-500
                  ${location.pathname === link.path || location.hash === link.path.split('#')[1]
                    ? 'text-primary-500'
                    : 'text-gray-700 dark:text-gray-300'
                  }
                `}
              >
                {link.name}
              </a>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-border hover:bg-gray-200 dark:hover:bg-dark-surface transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <IoSunny className="w-5 h-5 text-yellow-500" />
              ) : (
                <IoMoon className="w-5 h-5 text-blue-500" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <IoClose className="w-6 h-6" />
            ) : (
              <IoMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-dark-surface border-t border-gray-200 dark:border-dark-border"
          >
            <div className="container-custom py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  className={`
                    block px-4 py-2 rounded-lg
                    transition-colors
                    ${location.pathname === link.path || location.hash === link.path.split('#')[1]
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border'
                    }
                  `}
                >
                  {link.name}
                </a>
              ))}

              {/* Theme Toggle Mobile */}
              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-dark-border hover:bg-gray-200 dark:hover:bg-dark-surface transition-colors"
              >
                {theme === 'dark' ? (
                  <>
                    <IoSunny className="w-5 h-5 text-yellow-500" />
                    <span>Modo Claro</span>
                  </>
                ) : (
                  <>
                    <IoMoon className="w-5 h-5 text-blue-500" />
                    <span>Modo Oscuro</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
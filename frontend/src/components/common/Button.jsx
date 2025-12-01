import React from 'react';
import { motion } from 'framer-motion';

/**
 * Componente Button reutilizable con variantes
 * 
 * @param {string} variant - Estilo del botón: 'primary', 'secondary', 'outline', 'ghost', 'danger'
 * @param {string} size - Tamaño: 'sm', 'md', 'lg'
 * @param {boolean} loading - Mostrar estado de carga
 * @param {boolean} disabled - Deshabilitar botón
 * @param {ReactNode} children - Contenido del botón
 * @param {string} className - Clases CSS adicionales
 * @param {function} onClick - Función al hacer click
 */

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  disabled = false,
  children, 
  className = '',
  type = 'button',
  icon: Icon,
  iconPosition = 'left',
  ...props 
}) => {
  // Estilos base
  const baseStyles = 'font-medium rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Variantes de estilo
  const variants = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white focus:ring-primary-500',
    ghost: 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface focus:ring-gray-400',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-lg hover:shadow-xl',
  };

  // Tamaños
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <motion.button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      {...props}
    >
      {loading ? (
        <>
          <div className="spinner w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Cargando...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
        </>
      )}
    </motion.button>
  );
};

export default Button;
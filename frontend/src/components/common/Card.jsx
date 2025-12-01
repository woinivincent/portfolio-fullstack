import React from 'react';
import { motion } from 'framer-motion';

/**
 * Componente Card reutilizable
 * 
 * @param {ReactNode} children - Contenido de la tarjeta
 * @param {boolean} hover - Efecto hover
 * @param {string} className - Clases adicionales
 * @param {function} onClick - Función al hacer click
 */

const Card = ({ 
  children, 
  hover = false, 
  className = '',
  padding = true,
  onClick,
  ...props 
}) => {
  const cardClasses = `
    bg-white dark:bg-dark-surface 
    rounded-xl shadow-lg
    border border-gray-200 dark:border-dark-border
    transition-all duration-300
    ${padding ? 'p-6' : ''}
    ${hover ? 'hover:shadow-2xl hover:-translate-y-1 cursor-pointer' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  if (hover || onClick) {
    return (
      <motion.div
        className={cardClasses}
        onClick={onClick}
        whileHover={hover ? { y: -5 } : {}}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cardClasses} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

export default Card;
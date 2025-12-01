import React from 'react';
import { motion } from 'framer-motion';

/**
 * Componente Loading con diferentes variantes
 * 
 * @param {string} variant - Tipo: 'spinner', 'dots', 'pulse', 'full'
 * @param {string} size - Tamaño: 'sm', 'md', 'lg'
 * @param {string} text - Texto opcional
 */

const Loading = ({ 
  variant = 'spinner', 
  size = 'md',
  text = '',
  fullScreen = false 
}) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  // Spinner tradicional
  const Spinner = () => (
    <div className={`
      ${sizes[size]} 
      border-4 border-gray-200 dark:border-gray-700 
      border-t-primary-500 
      rounded-full 
      animate-spin
    `} />
  );

  // Dots animados
  const Dots = () => (
    <div className="flex gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 bg-primary-500 rounded-full"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );

  // Pulse
  const Pulse = () => (
    <div className="flex gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`
            ${sizes[size]}
            bg-primary-500 
            rounded-full
          `}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );

  const variants = {
    spinner: <Spinner />,
    dots: <Dots />,
    pulse: <Pulse />,
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      {variants[variant] || <Spinner />}
      {text && (
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-dark-bg bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

export default Loading;
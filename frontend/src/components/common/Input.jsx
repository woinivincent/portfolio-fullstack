import React from 'react';

/**
 * Componente Input reutilizable
 * 
 * @param {string} label - Etiqueta del input
 * @param {string} type - Tipo de input (text, email, password, etc.)
 * @param {string} error - Mensaje de error
 * @param {string} icon - Ícono (componente React)
 * @param {string} placeholder - Placeholder
 * @param {boolean} required - Campo requerido
 */

const Input = ({ 
  label, 
  type = 'text', 
  error, 
  icon: Icon,
  className = '',
  containerClassName = '',
  ...props 
}) => {
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        
        <input
          type={type}
          className={`
            w-full px-4 py-3 rounded-lg
            ${Icon ? 'pl-11' : ''}
            border border-gray-300 dark:border-dark-border
            bg-white dark:bg-dark-surface
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            disabled:bg-gray-100 dark:disabled:bg-dark-border disabled:cursor-not-allowed
            transition-all duration-200
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg">
      <div className="text-center">
        <h1 className="text-9xl font-bold gradient-text mb-4">404</h1>
        <p className="text-2xl text-gray-400 mb-8">Página no encontrada</p>
        <Link 
          to="/" 
          className="px-8 py-4 bg-primary-500 text-white rounded-lg font-bold hover:bg-primary-600 transition-colors inline-block"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
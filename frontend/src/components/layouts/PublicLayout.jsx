import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from '../common';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-dark-bg">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
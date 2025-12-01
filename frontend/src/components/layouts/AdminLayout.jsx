import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  IoMenu, 
  IoClose, 
  IoHome, 
  IoBriefcase, 
  IoSchool,
  IoRibbon,
  IoPerson,
  IoLogOut,
  IoShieldCheckmark,
  IoFolderOpen,
  IoMoon,
  IoSunny
} from 'react-icons/io5';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import toast from 'react-hot-toast';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { name: 'Dashboard', icon: IoHome, path: '/admin' },
    { name: 'Proyectos', icon: IoFolderOpen, path: '/admin/projects' },
    { name: 'Perfil', icon: IoPerson, path: '/admin/profile' },
    { name: 'Experiencia', icon: IoBriefcase, path: '/admin/experience' },
    { name: 'Educación', icon: IoSchool, path: '/admin/education' },
    { name: 'Certificaciones', icon: IoRibbon, path: '/admin/certifications' },
  ];

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada correctamente');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen
          bg-white dark:bg-dark-surface
          border-r border-gray-200 dark:border-dark-border
          transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          w-64
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-border">
            <Link to="/admin" className="flex items-center gap-2">
              <IoShieldCheckmark className="w-8 h-8 text-primary-500" />
              <span className="text-xl font-bold gradient-text">Admin</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border"
            >
              <IoClose className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-gray-200 dark:border-dark-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
                {user?.username?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {user?.username || 'Admin'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Administrador
                </p>
              </div>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-colors group
                    ${isActive
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border'
                    }
                  `}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? '' : 'group-hover:text-primary-500'}`} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200 dark:border-dark-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
            >
              <IoLogOut className="w-5 h-5" />
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`
          transition-all duration-300
          ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}
        `}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border"
            >
              <IoMenu className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border"
              >
                {theme === 'dark' ? (
                  <IoSunny className="w-5 h-5 text-yellow-500" />
                ) : (
                  <IoMoon className="w-5 h-5 text-blue-500" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
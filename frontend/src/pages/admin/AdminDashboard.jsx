import React from 'react';
import { IoStatsChart, IoFolderOpen, IoPerson, IoBriefcase } from 'react-icons/io5';

const AdminDashboard = () => {
  const stats = [
    { name: 'Proyectos', value: '12', icon: IoFolderOpen, color: 'bg-blue-500' },
    { name: 'Experiencias', value: '3', icon: IoBriefcase, color: 'bg-green-500' },
    { name: 'Certificaciones', value: '8', icon: IoStatsChart, color: 'bg-purple-500' },
    { name: 'Visitas', value: '1.2k', icon: IoPerson, color: 'bg-orange-500' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
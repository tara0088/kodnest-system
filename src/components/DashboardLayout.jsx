import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Code, 
  FileText, 
  BookOpen, 
  User,
  History
} from 'lucide-react';

const DashboardLayout = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Code, label: 'Practice', path: '/dashboard/practice' },
    { icon: FileText, label: 'Assessments', path: '/dashboard/assessments' },
    { icon: BookOpen, label: 'Resources', path: '/dashboard/resources' },
    { icon: History, label: 'History', path: '/dashboard/history' },
    { icon: User, label: 'Profile', path: '/dashboard/profile' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary-600 mb-8">Placement Prep</h1>
          
          <nav className="space-y-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href={item.path}
                  className="nav-link"
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Placement Readiness Platform</h2>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
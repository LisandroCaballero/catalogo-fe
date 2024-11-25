"use client";
import { useState } from 'react';
import { Menu, X, Package, Search, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/dashboard/Navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      icon: <Package className="w-5 h-5" />,
      label: 'Productos',
      href: '/dashboard/products'
    },
    {
      icon: <Search className="w-5 h-5" />,
      label: 'Buscar',
      href: '/dashboard/search'
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: 'Configuración',
      href: '/dashboard/settings'
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header móvil */}
        <header className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            </div>
          </div>
        </header>

        {/* Sidebar para móvil con overlay */}
        {isSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg">
              <div className="p-4 flex justify-between items-center border-b dark:border-gray-700">
                <h2 className="font-semibold dark:text-white">Menú</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="p-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 ${
                      pathname === item.href
                        ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Sidebar desktop */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="px-4 py-5 border-b border-gray-200 dark:border-gray-700">
              <h1 className="text-xl font-semibold dark:text-white">Catálogo</h1>
            </div>

            <nav className="flex-1 p-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 ${
                    pathname === item.href
                      ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Contenido principal con Navbar en desktop */}
        <main className="lg:pl-64">
          <div className="hidden lg:block">
            <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </div>
          <div className="max-w-7xl mx-auto p-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
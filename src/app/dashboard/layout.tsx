"use client";
import { useState, useEffect } from 'react';
import { Sun, Moon, Package, Search, Settings } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/dashboard/Navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 min-h-screen shadow-sm">
          <nav className="mt-5 px-2">
            <Link 
              href="/dashboard/products"
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Package className="mr-3 h-6 w-6" />
              Productos
            </Link>
            <Link 
              href="/dashboard/search"
              className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Search className="mr-3 h-6 w-6" />
              Buscar
            </Link>
            <Link 
              href="/dashboard/settings"
              className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Settings className="mr-3 h-6 w-6" />
              Configuración
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
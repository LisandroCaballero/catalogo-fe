"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, ChevronDown, User, Settings } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

export default function Navbar({ isDarkMode, setIsDarkMode }: NavbarProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userName = localStorage.getItem('userName') || 'Usuario';

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav className={`shadow-sm relative ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Catálogo
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Toggle de tema */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={() => setIsDarkMode(!isDarkMode)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>

            {/* Avatar y menú */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`flex items-center gap-2 p-2 rounded-lg ${
                  isDarkMode 
                    ? 'hover:bg-gray-700 text-white' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium">{userName}</span>
                <ChevronDown 
                  size={20} 
                  className={`transform transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              {/* Menú desplegable con z-index aumentado */}
              {isMenuOpen && (
                <div 
                  className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  }`}
                  style={{ 
                    zIndex: 9999,
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))'
                  }}
                >
                  <div className="py-1">
                    <div className={`px-4 py-3 border-b ${
                      isDarkMode ? 'border-gray-700 text-white' : 'border-gray-200'
                    }`}>
                      <p className="text-sm font-medium">{userName}</p>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>Administrador</p>
                    </div>
                    <a
                      href="#"
                      className={`flex items-center gap-2 px-4 py-2 text-sm ${
                        isDarkMode 
                          ? 'text-gray-200 hover:bg-gray-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <User size={16} />
                      Perfil
                    </a>
                    <a
                      href="#"
                      className={`flex items-center gap-2 px-4 py-2 text-sm ${
                        isDarkMode 
                          ? 'text-gray-200 hover:bg-gray-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Settings size={16} />
                      Configuración
                    </a>
                    <button
                      onClick={handleLogout}
                      className={`flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <LogOut size={16} />
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
"use client";
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">Productos</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Aquí irán las tarjetas de productos */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="aspect-w-1 aspect-h-1 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4">
            {/* Imagen del producto */}
          </div>
          <h3 className="font-semibold dark:text-white">Nombre del Producto</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Categoría</p>
          <div className="mt-2 flex justify-between items-center">
            <span className="font-bold dark:text-white">$99.99</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">Stock: 10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
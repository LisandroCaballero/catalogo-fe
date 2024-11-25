"use client";
import { useState } from 'react';
import { MoreHorizontal, Edit, Trash2, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

interface Column {
  key: string;
  header: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onView?: (item: any) => void;
  showActions?: boolean;
  pageSize?: number;
}

export default function Table({
  columns = [],
  data = [],
  onEdit,
  onDelete,
  onView,
  showActions = true,
  pageSize = 10
}: TableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(pageSize);

  // Calcular índices de paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Generar array de páginas
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={`${column.key}-${index}`}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
              {showActions && (
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((item, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((column, colIndex) => (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {column.render ? column.render(item[column.key], item) : item[column.key]}
                  </td>
                ))}
                {showActions && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {onView && (
                        <button
                          onClick={() => onView(item)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                      )}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Nueva Paginación estilo MUI */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, data.length)} de{' '}
              {data.length} resultados
            </p>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center p-2 rounded-full text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {getPageNumbers().map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-full focus:z-20
                  ${currentPage === number
                    ? 'z-10 bg-blue-600 text-white'
                    : 'text-gray-500 hover:bg-gray-50'
                  }`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center p-2 rounded-full text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Paginación móvil */}
        <div className="flex sm:hidden w-full items-center justify-between">
          <div className="text-sm text-gray-700">
            Página {currentPage} de {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center p-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center p-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
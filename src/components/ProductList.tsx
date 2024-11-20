"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Plus, Eye, Edit, Trash2, MoreVertical } from 'lucide-react';
import Table from '@/components/ui/Table';
import Image from 'next/image';
import { getProducts } from '@/lib/api';

interface Product {
  id: number;
  name: string;
  price: string;
  quantity: number;
  imageUrl: string;
  category: string;
}

export default function ProductList() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Columnas para la vista desktop
  const columns = [
    {
      key: 'imageUrl',
      header: 'Imagen',
      render: (value: string, item: Product) => (
        <div className="w-12 h-12 relative">
          <Image
            src={`http://localhost:3000/uploads/${value}`}
            alt={item.name}
            width={48}
            height={48}
            className="rounded-lg object-cover"
          />
        </div>
      ),
    },
    {
      key: 'name',
      header: 'Producto',
      render: (value: string, item: Product) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{item.category}</div>
        </div>
      ),
    },
    {
      key: 'price',
      header: 'Precio',
      render: (value: string) => `USD ${Number(value).toFixed(2)}`,
    },
    {
      key: 'quantity',
      header: 'Stock',
      render: (value: number) => (
        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
          {value} unidades
        </span>
      ),
    },
  ];

  // Lista móvil con menú de acciones
  const MobileList = () => (
    <div className="md:hidden space-y-4">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow">
          <div className="flex items-center p-4">
            <div className="w-16 h-16 relative">
              <Image
                src={`http://localhost:3000/uploads/${product.imageUrl}`}
                alt={product.name}
                width={64}
                height={64}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <div className="mt-1">
                <span className="font-medium">USD {Number(product.price).toFixed(2)}</span>
                <span className="ml-2 text-sm text-green-600">Stock: {product.quantity}</span>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => setActiveMenu(activeMenu === product.id ? null : product.id)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <MoreVertical className="w-5 h-5 text-gray-500" />
              </button>
              {activeMenu === product.id && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                  <div className="py-1">
                    <button
                      onClick={() => router.push(`/dashboard/products/${product.id}`)}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Eye className="w-4 h-4 mr-2" /> Ver
                    </button>
                    <button
                      onClick={() => router.push(`/dashboard/products/${product.id}/edit`)}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Edit className="w-4 h-4 mr-2" /> Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> Eliminar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await fetch(`http://localhost:3000/products/${id}`, {
          method: 'DELETE',
        });
        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
            <p className="text-sm text-gray-600">
              Lista de todos los productos disponibles
            </p>
          </div>
          <button
            onClick={() => router.push('/dashboard/products/create')}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Agregar Producto
          </button>
        </div>
      </div>

      {/* Mobile View */}
      <MobileList />

      {/* Desktop View */}
      <div className="hidden md:block">
        <Table
          columns={columns}
          data={products}
          onView={(item) => router.push(`/dashboard/products/${item.id}`)}
          onEdit={(item) => router.push(`/dashboard/products/${item.id}/edit`)}
          onDelete={(item) => handleDelete(item.id)}
        />
      </div>
    </div>
  );
}
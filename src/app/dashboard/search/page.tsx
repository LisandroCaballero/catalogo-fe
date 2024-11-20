"use client";
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { getProducts } from '@/lib/api';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  description: string;
  imageUrl?: string;
}

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Buscar Productos</h1>
        <p className="text-gray-600">Encuentra productos por nombre, categoría o descripción</p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              {product.imageUrl && (
                <img
                  src={`http://localhost:3000/uploads/${product.imageUrl}`}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              )}
              <div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="text-sm font-medium mt-1">USD {product.price}</p>
                <p className="text-sm text-gray-500">Stock: {product.quantity}</p>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No se encontraron productos que coincidan con tu búsqueda.</p>
        </div>
      )}
    </div>
  );
}
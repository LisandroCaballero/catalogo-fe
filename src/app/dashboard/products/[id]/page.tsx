"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProduct } from '@/lib/api';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(params.id as string);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => router.back()}
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          ← Volver a productos
        </button>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="md:flex">
            {/* Imagen del producto */}
            <div className="md:flex-shrink-0 md:w-1/2 bg-gray-50 p-6">
              <img
                src={`http://localhost:3000/uploads/${product.imageUrl}`}
                alt={product.name}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Información del producto */}
            <div className="p-8 md:w-1/2">
              <div className="uppercase tracking-wide text-sm text-blue-500 font-semibold">
                {product.category}
              </div>
              <h1 className="mt-1 text-2xl font-bold text-gray-900">
                {product.name}
              </h1>
              
              <div className="mt-4">
                <div className="text-3xl font-bold text-gray-900">
                  $ USD {product.price}
                </div>
                <div className="mt-2 flex items-center text-gray-600">
                  <span className="mr-2">Stock:</span>
                  <span className="font-medium">{product.quantity} unidades</span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Creado el: {new Date(product.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900">Descripción</h2>
                <p className="mt-2 text-gray-600">{product.description}</p>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-4">
            <button
              onClick={() => router.push(`/dashboard/products/${params.id}/edit`)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Editar Producto
            </button>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
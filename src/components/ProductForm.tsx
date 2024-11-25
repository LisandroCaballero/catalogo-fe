"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct } from '@/lib/api';
import { Camera, Image as ImageIcon } from 'lucide-react';

export default function ProductForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    category: '',
    description: ''
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('price', formData.price);
      form.append('quantity', formData.quantity);
      form.append('category', formData.category);
      form.append('description', formData.description);

      const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
      if (fileInput?.files?.[0]) {
        form.append('image', fileInput.files[0]);
      }

      await createProduct(form);
      router.push('/dashboard/products');
      router.refresh();
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Agregar Producto</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Complete los detalles del nuevo producto</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        {/* Imagen del Producto */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Imagen del Producto
          </label>
          <div className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
            {imagePreview ? (
              <div className="mb-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-40 mx-auto object-contain rounded-lg"
                />
              </div>
            ) : (
              <div className="flex justify-center mb-4">
                <ImageIcon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              </div>
            )}
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
              {imagePreview ? 'Imagen seleccionada' : 'Ninguna imagen seleccionada'}
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 dark:text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-medium
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                dark:file:bg-blue-900/50 dark:file:text-blue-400
                dark:hover:file:bg-blue-900/75"
            />
          </div>
        </div>

        {/* Nombre del Producto */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Nombre del Producto
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            placeholder="Nombre del producto"
          />
        </div>

        {/* Precio y Cantidad */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Precio
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">
                USD
              </span>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full pl-12 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                placeholder="0.00"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Cantidad
            </label>
            <input
              type="number"
              required
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="0"
            />
          </div>
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Categoría
          </label>
          <input
            type="text"
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            placeholder="Categoría del producto"
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Descripción
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            placeholder="Describe el producto..."
          />
        </div>

        {/* Botones */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Guardando...' : 'Guardar Producto'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/dashboard/products')}
            className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
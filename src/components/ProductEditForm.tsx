"use client";
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { getProduct, updateProduct } from '@/lib/api';

interface ProductFormData {
  name: string;
  price: number;
  quantity: number;
  category: string;
  description: string;
  image?: FileList;
}

interface ProductEditFormProps {
  productId: string;
}

export default function ProductEditForm({ productId }: ProductEditFormProps) {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProductFormData>();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const product = await getProduct(productId);
        reset({
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          category: product.category,
          description: product.description
        });
        if (product.imageUrl) {
          setImagePreview(`http://localhost:3000/uploads/${product.imageUrl}`);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading product:', error);
      }
    };
    loadProduct();
  }, [productId, reset]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('price', data.price.toString());
      formData.append('quantity', data.quantity.toString());
      formData.append('category', data.category);
      formData.append('description', data.description);
      
      if (data.image?.[0]) {
        formData.append('image', data.image[0]);
      }

      await updateProduct(productId, formData);
      router.push('/products');
      router.refresh();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  if (isLoading) {
    return <div className="text-center p-4">Cargando...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Editar Producto</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del Producto
          </label>
          <input
            {...register('name', { required: 'El nombre es requerido' })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio (USD)
            </label>
            <input
              type="number"
              step="0.01"
              {...register('price', { 
                required: 'El precio es requerido',
                min: { value: 0, message: 'El precio debe ser mayor a 0' }
              })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            {errors.price && (
              <span className="text-red-500 text-sm">{errors.price.message}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cantidad
            </label>
            <input
              type="number"
              {...register('quantity', { 
                required: 'La cantidad es requerida',
                min: { value: 0, message: 'La cantidad debe ser mayor a 0' }
              })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            {errors.quantity && (
              <span className="text-red-500 text-sm">{errors.quantity.message}</span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <input
            {...register('category', { required: 'La categoría es requerida' })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          {errors.category && (
            <span className="text-red-500 text-sm">{errors.category.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            {...register('description', { required: 'La descripción es requerida' })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 h-24"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">{errors.description.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Imagen
          </label>
          <input
            type="file"
            accept="image/*"
            {...register('image')}
            onChange={handleImageChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-32 object-contain"
              />
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Guardar Cambios
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
}